local Players = game:GetService("Players")

local function onPlayerAdded(player)
	-- Create Leaderstats
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	leaderstats.Parent = player

	local stage = Instance.new("IntValue")
	stage.Name = "Stage"
	stage.Value = 1 -- Default start stage
	stage.Parent = leaderstats
	


	-- Optional: Load saved stage here using DataStoreService if persistence is needed
	
	player.CharacterAdded:Connect(function(character)
		-- Find the spawn for the current stage
		-- This assumes you have Spawns tagged or named specifically via Team Spawns
		-- If using Team Spawns, Roblox handles the spawning automatically if Teams are set up correctly.
		-- This script mainly ensures the Leaderstats exist.
		
		-- Logic to manually teleport if not using Team Spawns (Simple fallback)
		local currentStage = stage.Value
		local spawns = workspace:FindFirstChild("StageSpawns") or workspace
		local spawnLocation = spawns:FindFirstChild("Stage" .. currentStage)
		
		if spawnLocation and spawnLocation:IsA("BasePart") then
			task.wait() -- Wait for character to be fully ready
			character:PivotTo(spawnLocation.CFrame + Vector3.new(0, 3, 0))
		end
	end)
end

Players.PlayerAdded:Connect(onPlayerAdded)

