--!strict
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Shared = ReplicatedStorage:WaitForChild("Shared")
local GameConfig = require(Shared.GameConfig)
local Remotes = require(Shared.Remotes)

local IdeationGui = {}

function IdeationGui.Mount(parent: Instance)
	local screenGui = Instance.new("ScreenGui")
	screenGui.Name = "IdeationBoard"
	screenGui.ResetOnSpawn = false
	screenGui.Parent = parent
	
	local frame = Instance.new("Frame")
	frame.Size = UDim2.fromOffset(400, 300)
	frame.Position = UDim2.fromScale(0.5, 0.5)
	frame.AnchorPoint = Vector2.new(0.5, 0.5)
	frame.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
	frame.Parent = screenGui
	
	local title = Instance.new("TextLabel")
	title.Text = "New Startup Idea"
	title.Size = UDim2.new(1, 0, 0, 50)
	title.BackgroundTransparency = 1
	title.TextColor3 = Color3.new(1, 1, 1)
	title.Font = Enum.Font.GothamBold
	title.TextSize = 24
	title.Parent = frame
	
	-- State
	local selectedTarget = GameConfig.IDEAS.TARGETS[1]
	local selectedProblem = GameConfig.IDEAS.PROBLEMS[1]
	local selectedSolution = GameConfig.IDEAS.SOLUTIONS[1]

	-- Helper Component: Simple Dropdown (TextButton that cycles options)
	local function createDropdown(name: string, options: {string}, yPos: number, callback: (string) -> ())
		local label = Instance.new("TextLabel")
		label.Text = name .. ":"
		label.Size = UDim2.new(0.3, 0, 0, 30)
		label.Position = UDim2.fromScale(0.1, yPos)
		label.BackgroundTransparency = 1
		label.TextColor3 = Color3.new(0.8, 0.8, 0.8)
		label.TextXAlignment = Enum.TextXAlignment.Left
		label.Parent = frame

		local button = Instance.new("TextButton")
		button.Text = options[1]
		button.Size = UDim2.new(0.5, 0, 0, 30)
		button.Position = UDim2.fromScale(0.4, yPos)
		button.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
		button.TextColor3 = Color3.new(1, 1, 1)
		button.Parent = frame

		local currentIndex = 1
		button.MouseButton1Click:Connect(function()
			currentIndex = currentIndex + 1
			if currentIndex > #options then currentIndex = 1 end
			local choice = options[currentIndex]
			button.Text = choice
			callback(choice)
		end)
	end

	-- Create UI Elements
	createDropdown("Target", GameConfig.IDEAS.TARGETS, 0.25, function(val) selectedTarget = val end)
	createDropdown("Problem", GameConfig.IDEAS.PROBLEMS, 0.40, function(val) selectedProblem = val end)
	createDropdown("Solution", GameConfig.IDEAS.SOLUTIONS, 0.55, function(val) selectedSolution = val end)
	
	local submitBtn = Instance.new("TextButton")
	submitBtn.Text = "Pitch Startup Idea"
	submitBtn.Size = UDim2.new(0.8, 0, 0, 40)
	submitBtn.Position = UDim2.fromScale(0.1, 0.8)
	submitBtn.BackgroundColor3 = Color3.fromRGB(0, 170, 255)
	submitBtn.TextColor3 = Color3.new(1, 1, 1)
	submitBtn.Font = Enum.Font.GothamBold
	submitBtn.Parent = frame
	
	local statusLabel = Instance.new("TextLabel")
	statusLabel.Text = "Select your startup parameters..."
	statusLabel.Size = UDim2.new(1, 0, 0, 30)
	statusLabel.Position = UDim2.fromScale(0, 0.7)
	statusLabel.BackgroundTransparency = 1
	statusLabel.TextColor3 = Color3.new(0.8, 0.8, 0.8)
	statusLabel.Parent = frame

	-- Logic
	local SubmitIdeaEvent = Remotes.GetRemoteEvent("SubmitIdea")
	
	submitBtn.MouseButton1Click:Connect(function()
		statusLabel.Text = "Pitching..."
		SubmitIdeaEvent:FireServer(selectedTarget, selectedProblem, selectedSolution)
		
		-- Disable button temporarily
		submitBtn.Active = false
		submitBtn.BackgroundColor3 = Color3.fromRGB(100, 100, 100)
		submitBtn.Text = "Evaluating..."
	end)

	-- Listen for Feedback
	local FeedbackEvent = Remotes.GetRemoteEvent("IdeaFeedback")
	FeedbackEvent.OnClientEvent:Connect(function(score, feedback)
		statusLabel.Text = "Score: " .. score .. " - " .. feedback
		
		task.wait(2)
		submitBtn.Active = true
		submitBtn.BackgroundColor3 = Color3.fromRGB(0, 170, 255)
		submitBtn.Text = "Pitch Startup Idea"
	end)
end

return IdeationGui
