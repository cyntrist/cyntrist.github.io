extends Sprite2D

@export_range(0, 5, 0.1) var speed : float = 1.0

func _ready() -> void:
	global_position = get_global_mouse_position()
	pass
	
func _process(delta: float) -> void:
	global_position = lerp(self.global_position, get_global_mouse_position(), speed * delta) 
	pass
