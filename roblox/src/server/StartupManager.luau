--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Shared = ReplicatedStorage:WaitForChild("Shared")
local GameConfig = require(Shared.GameConfig)

local StartupManager = {}
StartupManager.__index = StartupManager

type Startup = {
	Id: string,
	Name: string,
	Members: {number}, -- PlayerUserIds
	Funds: number,
	Idea: {
		Target: string?,
		Problem: string?,
		Solution: string?
	}
}

local startups: {[string]: Startup} = {}

function StartupManager.CreateStartup(creator: Player, name: string)
	local id = tostring(os.time()) .. "_" .. tostring(creator.UserId)
	
	local newStartup: Startup = {
		Id = id,
		Name = name,
		Members = {creator.UserId},
		Funds = GameConfig.STARTING_FUNDS,
		Idea = {}
	}
	
	startups[id] = newStartup
	print("Startup Created:", name, "by", creator.Name)
	return newStartup
end

function StartupManager.GetStartupByPlayer(player: Player): Startup?
	for _, startup in pairs(startups) do
		if table.find(startup.Members, player.UserId) then
			return startup
		end
	end
	return nil
end

function StartupManager.JoinStartup(player: Player, startupId: string)
	local startup = startups[startupId]
	if startup then
		table.insert(startup.Members, player.UserId)
		print(player.Name, "joined startup", startup.Name)
	end
end

function StartupManager.NotifyUpdate(startup: Startup)
	local UpdateEvent = Remotes.GetRemoteEvent("UpdateStartupData")
	for _, memberId in ipairs(startup.Members) do
		local player = game.Players:GetPlayerByUserId(memberId)
		if player then
			UpdateEvent:FireClient(player, startup)
		end
	end
end

function StartupManager.SetIdea(startupId: string, target: string, problem: string, solution: string)
	local startup = startups[startupId]
	if startup then
		startup.Idea = {Target = target, Problem = problem, Solution = solution}
		print("Startup", startup.Name, "pivoted to:", target, problem, solution)
		StartupManager.NotifyUpdate(startup)
	end
end

function StartupManager.AddFunds(startupId: string, amount: number)
	local startup = startups[startupId]
	if startup then
		startup.Funds += amount
		print("Startup", startup.Name, "funds:", startup.Funds)
		StartupManager.NotifyUpdate(startup)
	end
end

return StartupManager
