local CollectionService = game:GetService("CollectionService")

local TAG_NAME = "DialoguePart"

local function createDialogueGui(part)
	local gui = Instance.new("SurfaceGui")
	gui.Face = Enum.NormalId.Front -- Default face, changeable
	gui.SizingMode = Enum.SurfaceGuiSizingMode.PixelsPerStud
	gui.PixelsPerStud = 50
	
	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(1, 0, 1, 0)
	label.BackgroundTransparency = 1
	label.TextColor3 = Color3.new(1, 1, 1) -- White
	label.TextStrokeTransparency = 0
	label.TextSize = 20
	label.Font = Enum.Font.FredokaOne
	label.TextWrapped = true
	
	-- Get Text from Attribute
	local text = part:GetAttribute("DialogueText") or "No text provided!"
	label.Text = text
	
	label.Parent = gui
	gui.Parent = part
end

local function setupDialogue(part)
	if not part:IsA("BasePart") then return end
	createDialogueGui(part)
end

for _, part in ipairs(CollectionService:GetTagged(TAG_NAME)) do
	setupDialogue(part)
end

CollectionService:GetInstanceAddedSignal(TAG_NAME):Connect(setupDialogue)
