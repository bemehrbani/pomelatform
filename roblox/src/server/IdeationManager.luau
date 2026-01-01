--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")

local Shared = ReplicatedStorage:WaitForChild("Shared")
local Remotes = require(Shared.Remotes)
local GameConfig = require(Shared.GameConfig)
local StartupManager = require(ServerScriptService.StartupManager)

local IdeationManager = {}

-- Define Remotes
local SubmitIdeaEvent = Remotes.GetRemoteEvent("SubmitIdea")

function IdeationManager.EvaluateIdea(target: string, problem: string, solution: string): (number, string)
	-- Simple evaluation logic
	-- In a real game, this would verify compatibility
	
	local score = 0
	local feedback = ""
	
	-- Arbitrary simple rules for educational purposes
	if target == "Gamers" and solution == "Hardware" then
		score += 30
		feedback = "Gamers love new hardware!"
	elseif target == "Students" and solution == "App" then
		score += 30
		feedback = "Students rely heavily on apps."
	else
		score += 10
		feedback = "A generic combination, but executable."
	end
	
	if problem == "Boredom" and solution == "App" then
		score += 20
	end
	
	return score, feedback
end

-- Handle Client Submission
SubmitIdeaEvent.OnServerEvent:Connect(function(player, target, problem, solution)
	print("Idea Received from", player.Name, ":", target, problem, solution)
	
	-- Verify input exists
	if not table.find(GameConfig.IDEAS.TARGETS, target) then return end
	-- (Add other checks here)
	
	local score, feedback = IdeationManager.EvaluateIdea(target, problem, solution)
	print("Evaluation:", score, feedback)
	
	-- Update Player's Startup
	local startup = StartupManager.GetStartupByPlayer(player)
	if startup then
		StartupManager.SetIdea(startup.Id, target, problem, solution)
		
		if score > 20 then
			-- Good idea grant funds
			StartupManager.AddFunds(startup.Id, 10000)
		end

		-- Notify client
		local FeedbackEvent = Remotes.GetRemoteEvent("IdeaFeedback")
		FeedbackEvent:FireClient(player, score, feedback)
	else
		print("Player", player.Name, "is not in a startup!")
	end
end)

return IdeationManager
