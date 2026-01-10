
import "@stdlib/deploy";

message Deposit {
    amount: Int as coins;
}

message Payout {
    amount: Int as coins;
    recipient: Address;
}

message Refund {
    query_id: Int as uint64;
}

contract Bounty with Deployable {
    owner: Address;
    oracle: Address;
    createdAt: Int as uint32;
    is_complete: Bool;
    // 7 days timeout
    const TIMEOUT: Int = 60 * 60 * 24 * 7; 

    init(owner: Address, oracle: Address) {
        self.owner = owner;
        self.oracle = oracle;
        self.createdAt = now();
        self.is_complete = false;
    }

    // Accept incoming TONs
    receive() {
        // Simple deposit
    }

    // Oracle triggers payout
    receive(msg: Payout) {
        let ctx: Context = context();
        require(ctx.sender == self.oracle, "Only oracle can payout");
        require(self.is_complete == false, "Already Paid"); // Replay Protection
        require(myBalance() >= msg.amount, "Insufficient balance");

        // Effects
        self.is_complete = true;

        // Interactions
        send(SendParameters{
            to: msg.recipient,
            value: msg.amount,
            mode: SendIgnoreErrors + SendPayGasSeparately,
            body: "Bounty Payout".asComment()
        });
    }

    // Owner triggers refund after timeout
    receive(msg: Refund) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Only owner can refund");
        require(now() > self.createdAt + self.TIMEOUT, "Timeout not reached");

        send(SendParameters{
            to: self.owner,
            value: 0,
            mode: SendRemainingBalance,
            body: "Refund".asComment()
        });
    }

    get fun balance(): Int {
        return myBalance();
    }

    get fun owner(): Address {
        return self.owner;
    }
}
