--!strict
local ServerScriptService = game:GetService("ServerScriptService")
local Players = game:GetService("Players")

local StartupManager = require(ServerScriptService.StartupManager)
local IdeationManager = require(ServerScriptService.IdeationManager)

print("Startup Game Server Initializing...")

Players.PlayerAdded:Connect(function(player)
	print(player.Name .. " joined the game.")
	
	-- For testing purposes, auto-create a startup for the first player
	task.delay(5, function()
		if player.Parent then
			StartupManager.CreateStartup(player, player.Name .. "'s Startup")
		end
	end)
end)
