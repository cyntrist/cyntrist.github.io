shader_type canvas_item;

uniform sampler2D SCREEN_TEXTURE : hint_screen_texture, filter_linear_mipmap;

group_uniforms Mask;
uniform float alpha : hint_range(0.0, 1.0, 0.01) = 1.0;
uniform float mask_threshold : hint_range(0.0, 1.0, 0.001) = 0.02;
uniform float mask_softness : hint_range(0.0, 1.0, 0.001) = 0.08;
uniform bool use_texture_alpha = true;
uniform bool multiply_texture_color = false;

group_uniforms Glass;
uniform vec4 tint_color : source_color = vec4(1.0, 1.0, 1.0, 1.0);
uniform float brightness : hint_range(-1.0, 1.0, 0.01) = 0.08;
uniform float bend_amount : hint_range(0.0, 2.0, 0.01) = 0.35;
uniform float chromatic_shift_amount : hint_range(0.0, 2.0, 0.01) = 0.08;
uniform float blur_amount : hint_range(0.0, 8.0, 0.1) = 2.0;

group_uniforms Light;
uniform float curve_light_blend : hint_range(0.0, 1.0, 0.01) = 0.35;
uniform float rim_light_blend : hint_range(0.0, 1.0, 0.01) = 0.75;

group_uniforms Grain;
uniform float grain_amount : hint_range(0.0, 1.0, 0.01) = 0.05;
uniform float grain_size : hint_range(0.1, 8.0, 0.01) = 1.0;

float noise(vec2 uv) {
	return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

void fragment() {
	vec4 tex = texture(TEXTURE, UV);

	float mask = use_texture_alpha ? tex.a : 1.0;
	mask = smoothstep(mask_threshold, mask_threshold + mask_softness, mask);

	if (mask <= 0.001) {
		discard;
	}

	vec2 centered_uv = UV * 2.0 - 1.0;
	vec2 warp_dir = normalize(centered_uv + vec2(0.0001));

	// Refraction is intentionally subtle so the folder silhouette stays readable.
	float thickness = pow(mask, 2.0);
	vec2 warp = warp_dir * thickness * bend_amount * 0.03;
	vec2 chroma = warp * chromatic_shift_amount;
	vec2 screen_uv = clamp(SCREEN_UV + warp, vec2(0.0), vec2(1.0));

	vec4 screen = vec4(
		textureLod(SCREEN_TEXTURE, clamp(screen_uv + chroma, vec2(0.0), vec2(1.0)), blur_amount).r,
		textureLod(SCREEN_TEXTURE, clamp(screen_uv, vec2(0.0), vec2(1.0)), blur_amount).g,
		textureLod(SCREEN_TEXTURE, clamp(screen_uv - chroma, vec2(0.0), vec2(1.0)), blur_amount).b,
		1.0
	);

	float inner_light = smoothstep(0.0, 0.85, mask);
	float rim_light = pow(1.0 - mask, 2.0);

	float grain_uv_scale = 1024.0 * grain_size;
	float grain = (noise(SCREEN_UV * grain_uv_scale) * 2.0 - 1.0) * grain_amount;

	vec3 color = screen.rgb;
	color = mix(color, color * tint_color.rgb, 0.15);
	color += brightness;
	color += inner_light * curve_light_blend * 0.12;
	color += rim_light * rim_light_blend * 0.25;
	color += grain;

	if (multiply_texture_color) {
		color *= tex.rgb;
	}

	float out_alpha = alpha * mask;
	COLOR = vec4(color, out_alpha);
}
