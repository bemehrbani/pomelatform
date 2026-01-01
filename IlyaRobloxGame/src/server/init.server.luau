-- Global Maze Hunt v1.0
-- Server Script

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")

-- Configuration
local MAZE_SIZE = 15 -- 15x15 grid
local CELL_SIZE = 12 -- Size of each cell in studs
local WALL_HEIGHT = 12
local CELL_SIZE = 12 -- Size of each cell in studs
local WALL_HEIGHT = 12
-- Image IDs found from search (GitHub/Rolimons/Library)
local COUNTRIES = {
	{Name="France", Image="rbxassetid://597003463"},
	{Name="Luxembourg", Image="rbxassetid://12221026490"},
	{Name="Malta", Image="rbxassetid://124370075"},
	{Name="Monaco", Image="rbxassetid://12221088155"},
	{Name="Belgium", Image="rbxassetid://5575222552"},
	{Name="Andorra", Image="rbxassetid://11793653294"},
	{Name="United Kingdom", Image="rbxassetid://8895036587"},
	{Name="Australia", Image="rbxassetid://11240147545"},
	{Name="Canada", Image="rbxassetid://6924369153"},
	{Name="Portugal", Image="rbxassetid://12221216855"}
}
local GAME_START_DELAY = 10 -- Seconds before maze opens

-- State
local flagsCollected = {} -- { [PlayerId] = count }
local gameRunning = false
local currentMazeFolder = nil

-------------------------------------------------------------------------------
-- 1. MAZE GENERATOR (Recursive Backtracker)
-------------------------------------------------------------------------------
local function generateMaze()
	print("Generating Maze...")
	
	-- Cleanup old maze
	if currentMazeFolder then currentMazeFolder:Destroy() end
	currentMazeFolder = Instance.new("Folder")
	currentMazeFolder.Name = "Maze"
	currentMazeFolder.Parent = Workspace

	-- Initialize Grid
	local grid = {}
	for x = 1, MAZE_SIZE do
		grid[x] = {}
		for y = 1, MAZE_SIZE do
			grid[x][y] = {visited = false, walls = {Top=true, Right=true, Bottom=true, Left=true}}
		end
	end

	-- Force Open Start Zone (Entrance)
	-- This ensures if you fall outside, you can walk in!
	grid[1][1].walls.Left = false
	grid[1][1].walls.Bottom = false
	grid[1][1].walls.Top = false
	grid[1][1].walls.Right = false

	-- Algorithm
	local stack = {}
	local currentCell = {x=1, y=1}
	grid[1][1].visited = true
	
	local function getUnvisitedNeighbors(cx, cy)
		local neighbors = {}
		local dirs = {
			{x=0, y=1, name="Top", opp="Bottom"},
			{x=1, y=0, name="Right", opp="Left"},
			{x=0, y=-1, name="Bottom", opp="Top"},
			{x=-1, y=0, name="Left", opp="Right"}
		}
		for _, d in ipairs(dirs) do
			local nx, ny = cx + d.x, cy + d.y
			if nx > 0 and nx <= MAZE_SIZE and ny > 0 and ny <= MAZE_SIZE and not grid[nx][ny].visited then
				table.insert(neighbors, {x=nx, y=ny, dir=d.name, opp=d.opp})
			end
		end
		return neighbors
	end

	table.insert(stack, currentCell)

	while #stack > 0 do
		local neighbors = getUnvisitedNeighbors(currentCell.x, currentCell.y)
		if #neighbors > 0 then
			local nextInfo = neighbors[math.random(1, #neighbors)]
			
			-- Remove walls
			grid[currentCell.x][currentCell.y].walls[nextInfo.dir] = false
			grid[nextInfo.x][nextInfo.y].walls[nextInfo.opp] = false
			
			grid[nextInfo.x][nextInfo.y].visited = true
			table.insert(stack, {x=nextInfo.x, y=nextInfo.y})
			currentCell = {x=nextInfo.x, y=nextInfo.y}
		else
			currentCell = table.remove(stack)
		end
	end

	-- BRAIDING (Aggressive): Remove 50% of internal walls to create many paths
	print("Braiding Maze (Aggressively)...")
	-- Iterate through ALL internal cells (leaving outer border intact)
	for x = 2, MAZE_SIZE - 1 do
		for y = 2, MAZE_SIZE - 1 do
			-- 50% chance to remove a wall!
			if math.random() < 0.5 then
				grid[x][y].walls.Top = false
				-- Update neighbor's mirroring wall if it exists
				if grid[x][y+1] then grid[x][y+1].walls.Bottom = false end
			end
			
			if math.random() < 0.5 then
				grid[x][y].walls.Right = false
				if grid[x+1] and grid[x+1][y] then grid[x+1][y].walls.Left = false end
			end
			
			if math.random() < 0.5 then
				grid[x][y].walls.Bottom = false
				if grid[x][y-1] then grid[x][y-1].walls.Top = false end
			end
			
			if math.random() < 0.5 then
				grid[x][y].walls.Left = false
				if grid[x-1] and grid[x-1][y] then grid[x-1][y].walls.Right = false end
			end
		end
	end

	-- Build 3D Walls
	print("Building 3D Walls...")
	for x = 1, MAZE_SIZE do
		for y = 1, MAZE_SIZE do
			local cell = grid[x][y]
			local centerX = x * CELL_SIZE
			local centerZ = y * CELL_SIZE
			
			-- Floor
			local floor = Instance.new("Part")
			floor.Name = "Floor_"..x.."_"..y
			floor.Size = Vector3.new(CELL_SIZE, 1, CELL_SIZE)
			floor.Position = Vector3.new(centerX, 0, centerZ)
			floor.Anchored = true
			floor.BrickColor = BrickColor.new("Dark stone grey")
			floor.Material = Enum.Material.Cobblestone
			floor.Parent = currentMazeFolder
			
			-- Walls
			if cell.walls.Top then
				local w = Instance.new("Part")
				w.Size = Vector3.new(CELL_SIZE, WALL_HEIGHT, 1)
				w.Position = Vector3.new(centerX, WALL_HEIGHT/2, centerZ - CELL_SIZE/2)
				w.Anchored = true
				w.BrickColor = BrickColor.new("Black")
				w.Parent = currentMazeFolder
			end
			if cell.walls.Right then
				local w = Instance.new("Part")
				w.Size = Vector3.new(1, WALL_HEIGHT, CELL_SIZE)
				w.Position = Vector3.new(centerX + CELL_SIZE/2, WALL_HEIGHT/2, centerZ)
				w.Anchored = true
				w.BrickColor = BrickColor.new("Black")
				w.Parent = currentMazeFolder
			end
			-- Don't double build Bottom/Left logic (simplified for grid)
			-- Actually, the above logic misses outer walls if we only rely on neighbor removal?
			-- No, because "walls" are true by default. 
			-- But we only iterate x,y.
			-- If I am at 1,1, and Bottom is true, I should build it?
			-- Yes, because 1,0 doesn't exist to build its Top.
			if cell.walls.Bottom then 
				local w = Instance.new("Part")
				w.Size = Vector3.new(CELL_SIZE, WALL_HEIGHT, 1)
				w.Position = Vector3.new(centerX, WALL_HEIGHT/2, centerZ + CELL_SIZE/2)
				w.Anchored = true
				w.BrickColor = BrickColor.new("Black")
				w.Parent = currentMazeFolder
			end
			if cell.walls.Left then
				local w = Instance.new("Part")
				w.Size = Vector3.new(1, WALL_HEIGHT, CELL_SIZE)
				w.Position = Vector3.new(centerX - CELL_SIZE/2, WALL_HEIGHT/2, centerZ)
				w.Anchored = true
				w.BrickColor = BrickColor.new("Black")
				w.Parent = currentMazeFolder
			end
		end
	end
	
	-- Create Entrance Sign
	local signPart = Instance.new("Part")
	signPart.Name = "EntranceSign"
	signPart.Size = Vector3.new(10, 4, 1)
	signPart.Position = Vector3.new(CELL_SIZE, WALL_HEIGHT + 2, CELL_SIZE)
	signPart.Anchored = true
	signPart.Transparency = 1
	signPart.Parent = currentMazeFolder
	
	local bg = Instance.new("BillboardGui")
	bg.Size = UDim2.new(0, 200, 0, 50)
	bg.StudsOffset = Vector3.new(0, 2, 0)
	bg.Parent = signPart
	
	local txt = Instance.new("TextLabel")
	txt.Size = UDim2.new(1,0,1,0)
	txt.BackgroundTransparency = 1
	txt.Text = "START HERE"
	txt.TextColor3 = Color3.new(0, 1, 0) -- Green
	txt.TextScaled = true
	txt.Font = Enum.Font.FredokaOne
	txt.Parent = bg

	-- Spawn Flags
	spawnFlags(grid)
	
	-- Create Winner Zone
	createWinnerZone()
end

-------------------------------------------------------------------------------
-- 2. FLAG SPAWNER
-------------------------------------------------------------------------------
function spawnFlags(grid)
	print("Spawning Flags...")
	local placedFlags = 0
	local usedCells = {} -- "x_y"
	
	-- Create RemoteEvent if not exists
	local re = ReplicatedStorage:FindFirstChild("UpdateFlags")
	if not re then
		re = Instance.new("RemoteEvent")
		re.Name = "UpdateFlags"
		re.Parent = ReplicatedStorage
	end

	-- Create Finish Zone setup (will activate later)
	-- ... Win Zone Logic ...
	
	while placedFlags < #COUNTRIES do
		local rx = math.random(1, MAZE_SIZE)
		local ry = math.random(1, MAZE_SIZE)
		local key = rx.."_"..ry
		
		if not usedCells[key] and not (rx==1 and ry==1) then -- Don't spawn on start
			usedCells[key] = true
			placedFlags = placedFlags + 1
			local country = COUNTRIES[placedFlags] -- Now an object {Name, Image}
			
			local flag = Instance.new("Part")
			flag.Name = "Flag_" .. country.Name
			flag.Size = Vector3.new(4, 6, 4) -- Slightly wider for images
			flag.Position = Vector3.new(rx * CELL_SIZE, 3, ry * CELL_SIZE)
			flag.Anchored = true
			flag.CanCollide = false
			flag.BrickColor = BrickColor.new("White") -- White background for flags
			flag.Material = Enum.Material.SmoothPlastic
			flag.Parent = currentMazeFolder
			
			-- Tag it
			flag:SetAttribute("Country", country.Name)
			
			-- ADD IMAGES (Decals) on all 4 sides
			for _, face in ipairs({Enum.NormalId.Front, Enum.NormalId.Back, Enum.NormalId.Left, Enum.NormalId.Right}) do
				local decal = Instance.new("Decal")
				decal.Face = face
				decal.Texture = country.Image
				decal.Parent = flag
			end
			
			-- Collection Logic (Keep same)
			flag.Touched:Connect(function(hit)
				local player = Players:GetPlayerFromCharacter(hit.Parent)
				if player then
					collectFlag(player, flag)
				end
			end)
		end
	end
end

function createWinnerZone()
	local centerPos = Vector3.new(MAZE_SIZE/2 * CELL_SIZE, WALL_HEIGHT + 2, MAZE_SIZE/2 * CELL_SIZE)
	
	local platform = Instance.new("Part")
	platform.Name = "WinnerPlatform"
	platform.Size = Vector3.new(40, 1, 40)
	platform.Position = centerPos
	platform.Anchored = true
	platform.BrickColor = BrickColor.new("Gold")
	platform.Material = Enum.Material.Neon
	platform.Transparency = 0.5
	platform.Parent = currentMazeFolder
	
	-- Winner Spawn (Neutral=false) so you only go there via script
	local spawn = Instance.new("SpawnLocation")
	spawn.Name = "WinnerSpawn"
	spawn.Size = Vector3.new(10, 1, 10)
	spawn.Position = centerPos + Vector3.new(0, 1, 0)
	spawn.Anchored = true
	spawn.BrickColor = BrickColor.new("Bright yellow")
	spawn.Neutral = false
	spawn.Parent = currentMazeFolder
	
	-- Effects
	local particles = Instance.new("ParticleEmitter")
	particles.Texture = "rbxassetid://1266170131" -- Star texture
	particles.Rate = 50
	particles.Speed = NumberRange.new(20, 30)
	particles.SpreadAngle = Vector2.new(360, 360)
	particles.Parent = spawn
end

-------------------------------------------------------------------------------
-- 3. COLLECTION LOGIC
-------------------------------------------------------------------------------
function collectFlag(player, flagPart)
	-- Check if we already collected this specfic flag instance
	-- Ideally per player.
	-- For simplicity: Destroy flag? No, it's multiplayer.
	-- We need a player data structure.
	
	local pid = player.UserId
	if not flagsCollected[pid] then flagsCollected[pid] = {} end
	
	local country = flagPart:GetAttribute("Country")
	if not flagsCollected[pid][country] then
		flagsCollected[pid][country] = true
		
		-- Count total
		local count = 0
		for k,v in pairs(flagsCollected[pid]) do count = count + 1 end
		
		-- Notify Client
		ReplicatedStorage.UpdateFlags:FireClient(player, count, #COUNTRIES, country)
		
		print(player.Name .. " found " .. country .. " ("..count.."/"..#COUNTRIES..")")
		
		-- Visual Feedback for player (Sound?)
		-- Ideally we play sound on client.
		
		if count >= #COUNTRIES then
			-- WINNER!
			task.wait(1) -- Small delay for drama
			local char = player.Character
			if char and char:FindFirstChild("HumanoidRootPart") then
				local winnerSpawn = currentMazeFolder:FindFirstChild("WinnerSpawn", true)
				if winnerSpawn then
					char.HumanoidRootPart.CFrame = winnerSpawn.CFrame + Vector3.new(0, 3, 0)
				end
			end
		end
	end
end

-------------------------------------------------------------------------------
-- 4. GAME LOOP
-------------------------------------------------------------------------------
print("Starting Global Maze Hunt Server...")

-- generate initially
generateMaze()

-- Spawn Lobby Board
local board = Instance.new("Part")
board.Name = "LobbyBoard"
board.Size = Vector3.new(20, 1, 20)
board.Position = Vector3.new(CELL_SIZE, 20, CELL_SIZE) -- Above start
board.Anchored = true
board.BrickColor = BrickColor.new("Glass")
board.Transparency = 0.5
board.Parent = Workspace
-- Spawn point on lobby
local spawn = Instance.new("SpawnLocation")
spawn.Position = board.Position + Vector3.new(0, 2, 0)
spawn.Anchored = true
spawn.Parent = Workspace

print("Maze Ready!")
