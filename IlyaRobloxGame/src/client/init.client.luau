local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create GUI
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "MazeGUI"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

local frame = Instance.new("Frame")
frame.Size = UDim2.new(0, 200, 0, 100)
frame.Position = UDim2.new(0, 20, 0, 20) -- Top Left
frame.BackgroundColor3 = Color3.new(0, 0, 0)
frame.BackgroundTransparency = 0.5
frame.Parent = screenGui

local label = Instance.new("TextLabel")
label.Size = UDim2.new(1, 0, 0.5, 0)
label.BackgroundTransparency = 1
label.TextColor3 = Color3.new(1, 1, 1)
label.TextScaled = true
label.Text = "flags Found: 0 / 10"
label.Parent = frame

local lastFlagLabel = Instance.new("TextLabel")
lastFlagLabel.Size = UDim2.new(1, 0, 0.4, 0)
lastFlagLabel.Position = UDim2.new(0, 0, 0.5, 0)
lastFlagLabel.BackgroundTransparency = 1
lastFlagLabel.TextColor3 = Color3.new(1, 1, 0) -- Yellow
lastFlagLabel.TextScaled = true
lastFlagLabel.Text = "Find the flags!"
lastFlagLabel.Parent = frame

-- Listen for Events
local re = ReplicatedStorage:WaitForChild("UpdateFlags")

re.OnClientEvent:Connect(function(count, total, lastCountry)
	label.Text = "Flags Found: " .. count .. " / " .. total
	lastFlagLabel.Text = "Found: " .. lastCountry .. "!"
	
	if count >= total then
		lastFlagLabel.Text = "ALL COLLECTED! YOU WIN!"
		lastFlagLabel.TextColor3 = Color3.new(0, 1, 0) -- Green
	end
end)

-------------------------------------------------------------------------------
-- WELCOME SCREEN (INSTRUCTIONS)
-------------------------------------------------------------------------------
local welcomeFrame = Instance.new("Frame")
welcomeFrame.Name = "WelcomeFrame"
welcomeFrame.Size = UDim2.new(0.5, 0, 0.5, 0)
welcomeFrame.Position = UDim2.new(0.25, 0, 0.25, 0) -- Center
welcomeFrame.BackgroundColor3 = Color3.new(0, 0, 0)
welcomeFrame.BackgroundTransparency = 0.2
welcomeFrame.BorderSizePixel = 4
welcomeFrame.BorderColor3 = Color3.new(1, 1, 1)
welcomeFrame.Parent = screenGui

local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, 0, 0.2, 0)
title.BackgroundTransparency = 1
title.Text = "GLOBAL MAZE HUNT"
title.TextColor3 = Color3.new(1, 0.8, 0) -- Gold
title.TextScaled = true
title.Font = Enum.Font.FredokaOne
title.Parent = welcomeFrame

local desc = Instance.new("TextLabel")
desc.Size = UDim2.new(0.8, 0, 0.5, 0)
desc.Position = UDim2.new(0.1, 0, 0.2, 0)
desc.BackgroundTransparency = 1
desc.Text = "Welcome!\n\n1. Search the Maze.\n2. Find all 10 Country Flags.\n3. Run to the finish!\n\nCan you find them all?"
desc.TextColor3 = Color3.new(1, 1, 1)
desc.TextScaled = true
desc.Parent = welcomeFrame

local playBtn = Instance.new("TextButton")
playBtn.Size = UDim2.new(0.4, 0, 0.2, 0)
playBtn.Position = UDim2.new(0.3, 0, 0.75, 0)
playBtn.BackgroundColor3 = Color3.new(0, 0.8, 0) -- Green
playBtn.Text = "PLAY!"
playBtn.TextScaled = true
playBtn.TextColor3 = Color3.new(1, 1, 1)
playBtn.Font = Enum.Font.FredokaOne
playBtn.Parent = welcomeFrame

local uiCorner = Instance.new("UICorner")
uiCorner.CornerRadius = UDim.new(0.2, 0)
uiCorner.Parent = playBtn

-- Close logic
playBtn.MouseButton1Click:Connect(function()
	welcomeFrame.Visible = false
end)
