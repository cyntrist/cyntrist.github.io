extends Control

@onready var mat: ShaderMaterial = material as ShaderMaterial

func _process(_delta: float) -> void:
	var local_mouse_pos := get_local_mouse_position()
	var size := get_rect().size
	
	var mouse_uv := Vector2(
		local_mouse_pos.x / size.x,
		local_mouse_pos.y / size.y
	)
	
	mat.set_shader_parameter("cursor_uv", mouse_uv)
	var inside := Rect2(Vector2.ZERO, size).has_point(local_mouse_pos)
	mat.set_shader_parameter("use_cursor_effect", inside)
