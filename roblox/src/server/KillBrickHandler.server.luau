local CollectionService = game:GetService("CollectionService")

local TAG_NAME = "KillBrick"

local function onTouched(part, hit)
	local character = hit.Parent
	if not character then return end
	
	local humanoid = character:FindFirstChild("Humanoid")
	if humanoid then
		humanoid.Health = 0
	end
end

local function onPartAdded(part)
	if part:IsA("BasePart") then
		part.Touched:Connect(function(hit)
			onTouched(part, hit)
		end)
	end
end

-- Hook up existing parts
for _, part in ipairs(CollectionService:GetTagged(TAG_NAME)) do
	onPartAdded(part)
end

-- Hook up future parts
CollectionService:GetInstanceAddedSignal(TAG_NAME):Connect(onPartAdded)
