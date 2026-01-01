local Debris = game:GetService("Debris")

-- Configuration
local SPAWN_RATE = 2.0 -- Seconds between spawns
local HAZARD_LIFETIME = 10 -- Seconds before hazard despawns
local DAMAGE_AMOUNT = 50

-- Setup - expects a Folder in Workspace named "SalmiakkiSpawners" containing Parts representing spawn points
local spawnFolder = workspace:FindFirstChild("SalmiakkiSpawners")

-- Template for the hazard object
local function createHazard()
	local part = Instance.new("Part")
	part.Name = "Salmiakki"
	part.Shape = Enum.PartType.Ball -- Or MeshPart if you have a mesh
	part.Size = Vector3.new(3, 3, 3)
	part.Color = Color3.fromRGB(20, 20, 20) -- Black/Dark Grey
	part.Material = Enum.Material.Plastic
	part.TopSurface = Enum.SurfaceType.Smooth
	part.BottomSurface = Enum.SurfaceType.Smooth
	
	-- Add damage script logic (or rely on KillBrick tag if we tag it!)
	-- Let's use the Tag method to be consistent with our previous work
	game:GetService("CollectionService"):AddTag(part, "KillBrick")
	
	return part
end

local function spawnHazards()
	if not spawnFolder then return end
	
	for _, spawner in ipairs(spawnFolder:GetChildren()) do
		if spawner:IsA("BasePart") then
			local hazard = createHazard()
			hazard.CFrame = spawner.CFrame
			hazard.Velocity = Vector3.new(math.random(-10, 10), -50, math.random(-10, 10)) -- Initial push downwards
			hazard.Parent = workspace
			
			Debris:AddItem(hazard, HAZARD_LIFETIME)
		end
	end
end

if spawnFolder then
	while true do
		spawnHazards()
		task.wait(SPAWN_RATE)
	end
else
	warn("SalmiakkiSpawners folder not found in Workspace! Creating it for you...")
	local folder = Instance.new("Folder")
	folder.Name = "SalmiakkiSpawners"
	folder.Parent = workspace
	
	-- Create a dummy spawner so it interacts immediately upon user fix
	local part = Instance.new("Part")
	part.Name = "SpawnerEx"
	part.Anchored = true
	part.Transparency = 0.5
	part.CanCollide = false
	part.Size = Vector3.new(2, 2, 2)
	part.CFrame = CFrame.new(0, 50, 0) -- High up
	part.Parent = folder
	
	spawnFolder = folder
	-- Restart loop
	while true do
		spawnHazards()
		task.wait(SPAWN_RATE)
	end
end
