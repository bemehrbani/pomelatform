--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

-- Simple Remote Management
local Remotes = {}

function Remotes.GetRemoteEvent(name: string): RemoteEvent
	local remote = ReplicatedStorage:FindFirstChild(name)
	if not remote then
		-- Only server can create remotes
		if RunService:IsServer() then
			remote = Instance.new("RemoteEvent")
			remote.Name = name
			remote.Parent = ReplicatedStorage
		else
			-- Client waits
			remote = ReplicatedStorage:WaitForChild(name)
		end
	end
	return remote :: RemoteEvent
end

function Remotes.GetRemoteFunction(name: string): RemoteFunction
	local remote = ReplicatedStorage:FindFirstChild(name)
	if not remote then
		if RunService:IsServer() then
			remote = Instance.new("RemoteFunction")
			remote.Name = name
			remote.Parent = ReplicatedStorage
		else
			remote = ReplicatedStorage:WaitForChild(name)
		end
	end
	return remote :: RemoteFunction
end

return Remotes
