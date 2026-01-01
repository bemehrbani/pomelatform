local CollectionService = game:GetService("CollectionService")
local BadgeService = game:GetService("BadgeService")
local Players = game:GetService("Players")

local TAG_NAME = "VictoryChest"
local BADGE_ID = 0 -- Replace with actual Badge ID if available
local SOUND_ID = "rbxassetid://12221967" -- Generic victory fanfare

local function onTouched(chest, hit)
	local character = hit.Parent
	if not character then return end
	
	local player = Players:GetPlayerFromCharacter(character)
	if not player then return end
	
	-- Play Sound
	local sound = Instance.new("Sound")
	sound.SoundId = SOUND_ID
	sound.Parent = character:FindFirstChild("HumanoidRootPart") or character.Head
	sound.PlayOnRemove = true -- Plays even if destroyed immediately
	sound:Destroy()
	
	-- Award Badge
	if BADGE_ID > 0 then
		pcall(function()
			BadgeService:AwardBadge(player.UserId, BADGE_ID)
		end)
	end
	
	-- Optional: Teleport to lobby or show UI
	print(player.Name .. " has won the game!")
end

local function setupChest(chest)
	if not chest:IsA("BasePart") then return end
	
	chest.Touched:Connect(function(hit)
		-- Debounce handled by specific logic or just simple touch
		-- For a victory chest, simple touch is usually fine, but let's prevent spam
		onTouched(chest, hit)
	end)
end

for _, chest in ipairs(CollectionService:GetTagged(TAG_NAME)) do
	setupChest(chest)
end

CollectionService:GetInstanceAddedSignal(TAG_NAME):Connect(setupChest)
