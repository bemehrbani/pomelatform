local CollectionService = game:GetService("CollectionService")
local TweenService = game:GetService("TweenService")

local TAG_NAME = "MovingPlatform"

-- Function to setup a moving platform
local function setupPlatform(platform)
	if not platform:IsA("BasePart") then return end
	
	-- Read configurations from Attributes or use defaults
	local moveDir = platform:GetAttribute("MoveDirection") or Vector3.new(10, 0, 0) -- Relative movement
	local duration = platform:GetAttribute("MoveDuration") or 3
	
	local startCFrame = platform.CFrame
	local endCFrame = startCFrame + moveDir
	
	local tweenInfo = TweenInfo.new(
		duration,
		Enum.EasingStyle.Sine,
		Enum.EasingDirection.InOut,
		-1, -- Repeat count: infinite
		true, -- Reverses: true
		0 -- DelayTime
	)
	
	local tween = TweenService:Create(platform, tweenInfo, {CFrame = endCFrame})
	tween:Play()
end

-- Hook up existing platforms
for _, platform in ipairs(CollectionService:GetTagged(TAG_NAME)) do
	setupPlatform(platform)
end

-- Hook up future platforms
CollectionService:GetInstanceAddedSignal(TAG_NAME):Connect(setupPlatform)
