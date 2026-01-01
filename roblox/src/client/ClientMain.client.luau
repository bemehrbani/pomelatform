local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local localPlayer = Players.LocalPlayer
print("DEBUG: ClientMain starting for " .. localPlayer.Name)
print("DEBUG: Checking for DashboardGui...")

-- Wait for everything to load
if not localPlayer:IsDescendantOf(Players) then
	localPlayer.AncestryChanged:Wait()
end

local Shared = ReplicatedStorage:WaitForChild("Shared")
local Remotes = require(Shared.Remotes)

local UiFolder = script.Parent:WaitForChild("ui")
local IdeationGui = require(UiFolder:WaitForChild("IdeationGui"))
local Dashboard = require(UiFolder:WaitForChild("Dashboard"))

-- Mount UI
task.wait(2) -- Give a small breathing room for loading
print("DEBUG: Attempting to mount UI...")
local playerGui = localPlayer:WaitForChild("PlayerGui")
IdeationGui.Mount(playerGui)
Dashboard.Mount(playerGui)
print("DEBUG: UI Mounted successfully!")
