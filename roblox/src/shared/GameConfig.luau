--!strict
local GameConfig = {}

GameConfig.STARTING_FUNDS = 50000 -- $50k seed
GameConfig.ROLES = {
	CEO = "CEO",
	CTO = "CTO",
	CMO = "CMO"
}

GameConfig.IDEAS = {
	TARGETS = {"Students", "Gamers", "Corporate", "Pet Owners"},
	PROBLEMS = {"Boredom", "Inefficiency", "Loneliness", "Hunger"},
	SOLUTIONS = {"App", "Service", "Hardware", "Platform"}
}

return GameConfig
