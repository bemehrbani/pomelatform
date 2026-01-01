--!strict
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Shared = ReplicatedStorage:WaitForChild("Shared")
local Remotes = require(Shared.Remotes)

local DashboardGui = {}

function DashboardGui.Mount(parent: Instance)
	local screenGui = Instance.new("ScreenGui")
	screenGui.Name = "DashboardGui"
	screenGui.ResetOnSpawn = false
	screenGui.Parent = parent

	-- Top Bar Background
	local frame = Instance.new("Frame")
	frame.Name = "TopBar"
	frame.Size = UDim2.new(1, 0, 0, 60)
	frame.Position = UDim2.fromScale(0, 0)
	frame.BackgroundColor3 = Color3.fromRGB(30, 30, 35)
	frame.BorderSizePixel = 0
	frame.Parent = screenGui

	-- Startup Name
	local nameLabel = Instance.new("TextLabel")
	nameLabel.Name = "StartupName"
	nameLabel.Text = "Loading Startup..."
	nameLabel.Size = UDim2.new(0.3, 0, 1, 0)
	nameLabel.Position = UDim2.fromScale(0.02, 0)
	nameLabel.BackgroundTransparency = 1
	nameLabel.TextColor3 = Color3.new(1, 1, 1)
	nameLabel.Font = Enum.Font.GothamBold
	nameLabel.TextSize = 24
	nameLabel.TextXAlignment = Enum.TextXAlignment.Left
	nameLabel.Parent = frame

	-- Funds Display
	local fundsLabel = Instance.new("TextLabel")
	fundsLabel.Name = "Funds"
	fundsLabel.Text = "$0"
	fundsLabel.Size = UDim2.new(0.2, 0, 1, 0)
	fundsLabel.Position = UDim2.fromScale(0.4, 0)
	fundsLabel.BackgroundTransparency = 1
	fundsLabel.TextColor3 = Color3.fromRGB(85, 255, 127) -- Green
	fundsLabel.Font = Enum.Font.GothamBold
	fundsLabel.TextSize = 24
	fundsLabel.Parent = frame

	-- Members List (Simplified)
	local membersLabel = Instance.new("TextLabel")
	membersLabel.Name = "Members"
	membersLabel.Text = "Members: -"
	membersLabel.Size = UDim2.new(0.3, 0, 1, 0)
	membersLabel.Position = UDim2.fromScale(0.7, 0)
	membersLabel.BackgroundTransparency = 1
	membersLabel.TextColor3 = Color3.new(0.8, 0.8, 0.8)
	membersLabel.Font = Enum.Font.Gotham
	membersLabel.TextSize = 14
	membersLabel.TextXAlignment = Enum.TextXAlignment.Right
	membersLabel.Parent = frame

	-- Listen for Data Updates
	local UpdateEvent = Remotes.GetRemoteEvent("UpdateStartupData")
	UpdateEvent.OnClientEvent:Connect(function(data)
		print("Dashboard received update:", data)
		nameLabel.Text = data.Name
		fundsLabel.Text = "$" .. string.format("%d", data.Funds)
		
		-- Simple member count for now
		membersLabel.Text = "Team Size: " .. #data.Members
	end)
end

return DashboardGui
