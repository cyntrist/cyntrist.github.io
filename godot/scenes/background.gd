extends ColorRect

@onready var shader_material: ShaderMaterial = material as ShaderMaterial


func _ready() -> void:
	set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	resized.connect(_update_shader_size)
	_update_shader_size()


func _update_shader_size() -> void:
	if shader_material == null:
		return

	shader_material.set_shader_parameter("rect_size", size)