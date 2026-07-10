extends Node2D

@export var wander_radius := 140.0
@export var wander_speed := 0.12
@export var follow_speed := 1.8
@export var secondary_radius := 40.0

var center := Vector2.ZERO
var noise := FastNoiseLite.new()
var time := 0.0
var current_offset := Vector2.ZERO
var target_offset := Vector2.ZERO

func _ready() -> void:
	center = global_position
	noise.seed = Time.get_ticks_usec()
	noise.noise_type = FastNoiseLite.TYPE_SIMPLEX
	noise.frequency = 1.0
	global_position = center

func _process(delta: float) -> void:
	time += delta * wander_speed

	var x := noise.get_noise_1d(time)
	var y := noise.get_noise_1d(time + 137.0)
	var wobble := noise.get_noise_1d(time + 503.0)

	target_offset = Vector2(x, y) * wander_radius
	target_offset += Vector2(y, -x) * secondary_radius * wobble

	var blend := 1.0 - exp(-follow_speed * delta)
	current_offset = current_offset.lerp(target_offset, blend)
	global_position = center + current_offset
