shader_type canvas_item;

/*
    SHADER PARAMETRIZADO DE ONDAS / GRADIENTE
    Color A arcoíris + ondas activadas por el ratón
    + flow direction rotatorio indefinido.
*/

// ------------------------------------------------------------
// ESPACIO / COORDENADAS
// ------------------------------------------------------------
group_uniforms Coords;

uniform bool use_screen_space = false;

uniform float local_aspect : hint_range(0.1, 5.0, 0.01) = 1.0;

uniform vec2 uv_offset = vec2(0.0, 0.0);
uniform float zoom : hint_range(0.1, 50.0, 0.01) = 10.0;

uniform bool use_perspective_warp = true;
uniform float perspective_depth : hint_range(0.1, 10.0, 0.01) = 2.3;


// ------------------------------------------------------------
// MOVIMIENTO
// ------------------------------------------------------------
group_uniforms Movement;

uniform float speed : hint_range(0.0, 5.0, 0.01) = 1.1;

// Dirección base del flujo.
// Se usa solo si rotate_flow_direction está en false.
uniform vec2 flow_direction = vec2(0.0, 0.3);

// Si está activado, flow_direction rota automáticamente.
uniform bool rotate_flow_direction = true;

// Velocidad angular de rotación.
// Positivo = gira en un sentido.
// Negativo = gira en el contrario.
uniform float flow_rotation_speed : hint_range(-10.0, 10.0, 0.01) = 0.6;

// Radio/intensidad del desplazamiento circular.
uniform float flow_rotation_radius : hint_range(0.0, 5.0, 0.01) = 0.3;

// Ángulo inicial de la rotación.
uniform float flow_rotation_offset : hint_range(-6.28318, 6.28318, 0.001) = 0.0;

// Si está activado, el flujo rota como una órbita estable.
// Si está desactivado, usa el movimiento acumulativo clásico con TIME.
uniform bool use_orbital_flow = true;

uniform float layer_2_speed : hint_range(-5.0, 5.0, 0.01) = 1.0;
uniform float layer_3_speed : hint_range(-5.0, 5.0, 0.01) = 0.17;


// ------------------------------------------------------------
// ROTACIÓN / CAPAS
// ------------------------------------------------------------
group_uniforms Layers;

uniform float rotation_angle : hint_range(-6.28318, 6.28318, 0.001) = 1.0472;

uniform float layer_1_strength : hint_range(0.0, 5.0, 0.01) = 1.0;
uniform float layer_2_strength : hint_range(0.0, 5.0, 0.01) = 1.0;
uniform float layer_3_strength : hint_range(0.0, 5.0, 0.01) = 1.0;


// ------------------------------------------------------------
// FORMA DE LA ONDA
// ------------------------------------------------------------
group_uniforms Wave;

uniform float wave_frequency_x : hint_range(0.0, 10.0, 0.01) = 1.0;
uniform float wave_frequency_y : hint_range(0.0, 10.0, 0.01) = 1.0;
uniform float wave_secondary_frequency : hint_range(0.0, 10.0, 0.01) = 0.43;

uniform float wave_inner_strength : hint_range(0.0, 5.0, 0.01) = 1.0;

uniform float wave_power : hint_range(0.1, 8.0, 0.01) = 2.0;


// ------------------------------------------------------------
// MAPEO DEL VALOR
// ------------------------------------------------------------
group_uniforms Value;

uniform bool use_abs_fold = true;
uniform float fold_center : hint_range(-5.0, 5.0, 0.01) = 1.5;

uniform float value_scale : hint_range(0.0, 5.0, 0.01) = 1.0;
uniform float value_offset : hint_range(-2.0, 2.0, 0.01) = 0.0;


// ------------------------------------------------------------
// GRADIENTE / COLOR
// ------------------------------------------------------------
group_uniforms Gradient;

uniform float rainbow_speed : hint_range(0.0, 5.0, 0.01) = 0.15;

uniform float rainbow_offset : hint_range(0.0, 1.0, 0.01) = 0.0;

uniform float rainbow_saturation : hint_range(0.0, 1.0, 0.01) = 1.0;

uniform float rainbow_value : hint_range(0.0, 1.0, 0.01) = 1.0;

uniform float rainbow_alpha : hint_range(0.0, 1.0, 0.01) = 1.0;

uniform vec4 color_b : source_color = vec4(0.85, 0.25, 0.75, 1.0);

uniform float gradation : hint_range(0.0, 2.0, 0.01) = 1.0;

uniform float gradient_center : hint_range(0.0, 1.0, 0.01) = 0.5;

uniform float contrast : hint_range(0.1, 8.0, 0.01) = 1.0;

uniform float midpoint : hint_range(0.0, 1.0, 0.01) = 0.5;

uniform bool invert_gradient = false;

// Cuántos ciclos de color aparecen a lo largo de la pantalla.
uniform float rainbow_screen_scale : hint_range(0.0, 5.0, 0.01) = 1.0;

// Dirección del gradiente en coordenadas de pantalla.
// (1, 0) = izquierda a derecha.
// (0, 1) = arriba a abajo.
// (1, 1) = diagonal.
uniform vec2 rainbow_direction = vec2(1.0, 0.0);

// Permite desactivar la dependencia espacial.
uniform bool use_screen_rainbow = true;

// ------------------------------------------------------------
// ACTIVACIÓN POR CURSOR
// ------------------------------------------------------------
group_uniforms Cursor;

uniform bool use_cursor_activation = true;

// Posición del cursor en UV local del nodo.
// Se actualiza desde GDScript.
// vec2(0.0, 0.0) = esquina superior izquierda.
// vec2(1.0, 1.0) = esquina inferior derecha.
uniform vec2 cursor_uv = vec2(0.5, 0.5);

// Radio de activación alrededor del cursor.
uniform float cursor_activation_radius : hint_range(0.0, 1.0, 0.001) = 0.22;

// Suavidad del borde de la zona activa.
uniform float cursor_activation_softness : hint_range(0.001, 1.0, 0.001) = 0.16;

// Intensidad mínima de las ondas fuera del cursor.
// 0.0 = fuera del cursor casi no hay ondas.
// 1.0 = fuera del cursor las ondas se ven normales.
uniform float inactive_wave_strength : hint_range(0.0, 1.0, 0.01) = 0.15;

// Intensidad máxima de las ondas dentro del radio del cursor.
uniform float active_wave_strength : hint_range(0.0, 5.0, 0.01) = 1.6;

// Cuánto afecta el cursor al contraste local.
uniform float cursor_contrast_boost : hint_range(0.0, 5.0, 0.01) = 1.4;

// Cuánto afecta el cursor al movimiento local.
uniform float cursor_motion_boost : hint_range(0.0, 5.0, 0.01) = 1.0;

// Ondas circulares que nacen alrededor del cursor.
uniform float cursor_ripple_strength : hint_range(0.0, 5.0, 0.01) = 0.8;

// Frecuencia de las ondas circulares.
uniform float cursor_ripple_frequency : hint_range(0.0, 80.0, 0.01) = 32.0;

// Velocidad de las ondas circulares.
uniform float cursor_ripple_speed : hint_range(0.0, 20.0, 0.01) = 5.0;


// ------------------------------------------------------------
// ALPHA / MÁSCARA
// ------------------------------------------------------------
group_uniforms Mask;

uniform float alpha : hint_range(0.0, 1.0, 0.01) = 1.0;

uniform bool use_texture_alpha = true;

uniform bool multiply_texture_color = false;


// ------------------------------------------------------------
// FUNCIONES
// ------------------------------------------------------------

mat2 rotation_matrix(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(vec2(c, s), vec2(-s, c));
}

vec2 get_flow_direction(float time) {
    if (rotate_flow_direction) {
        float angle = time * flow_rotation_speed + flow_rotation_offset;
        return vec2(cos(angle), sin(angle)) * flow_rotation_radius;
    }

    return flow_direction;
}

vec3 hsv_to_rgb(vec3 hsv) {
    vec3 rgb = clamp(
        abs(mod(hsv.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
        0.0,
        1.0
    );

    rgb = rgb * rgb * (3.0 - 2.0 * rgb);

    return hsv.z * mix(vec3(1.0), rgb, hsv.y);
}

vec4 get_rainbow_color_a(float time, vec2 screen_uv) {
    float spatial_offset = 0.0;

    if (use_screen_rainbow) {
        vec2 direction = normalize(rainbow_direction + vec2(0.00001));

        // Proyección de la posición de pantalla sobre la dirección elegida.
        spatial_offset = dot(screen_uv, direction) * rainbow_screen_scale;
    }

    float hue = fract(
        spatial_offset
        + time * rainbow_speed
        + rainbow_offset
    );

    vec3 rgb = hsv_to_rgb(
        vec3(hue, rainbow_saturation, rainbow_value)
    );

    return vec4(rgb, rainbow_alpha);
}

float wave(vec2 p) {
    float v = sin(
        p.x * wave_frequency_x +
        sin(p.y * wave_frequency_y) * wave_inner_strength +
        sin(p.y * wave_secondary_frequency) * wave_inner_strength
    );

    return pow(abs(v), wave_power);
}

float pattern(float time, vec2 p) {
    mat2 rot = rotation_matrix(rotation_angle);

    float v = 0.0;

    v += wave(p) * layer_1_strength;

    p.x += time * speed * layer_2_speed;
    p = p * rot;
    v += wave(p) * layer_2_strength;

    p.x += time * speed * layer_3_speed;
    p = p * rot;
    v += wave(p) * layer_3_strength;

    if (use_abs_fold) {
        v = abs(fold_center - v);
    }

    v = v * value_scale + value_offset;

    return v;
}

float apply_contrast_custom(float t, float contrast_value) {
    t = (t - midpoint) * contrast_value + midpoint;
    return clamp(t, 0.0, 1.0);
}

float get_cursor_activation_mask(vec2 uv) {
    vec2 corrected_uv = uv;
    vec2 corrected_cursor = cursor_uv;

    corrected_uv.x *= local_aspect;
    corrected_cursor.x *= local_aspect;

    float dist_to_cursor = distance(corrected_uv, corrected_cursor);

    float mask = 1.0 - smoothstep(
        cursor_activation_radius,
        cursor_activation_radius + cursor_activation_softness,
        dist_to_cursor
    );

    return clamp(mask, 0.0, 1.0);
}

float get_cursor_distance(vec2 uv) {
    vec2 corrected_uv = uv;
    vec2 corrected_cursor = cursor_uv;

    corrected_uv.x *= local_aspect;
    corrected_cursor.x *= local_aspect;

    return distance(corrected_uv, corrected_cursor);
}


// ------------------------------------------------------------
// FRAGMENT
// ------------------------------------------------------------

void fragment() {
    vec2 original_uv = UV;
    vec2 uv;

    if (use_screen_space) {
        vec2 resolution = 1.0 / SCREEN_PIXEL_SIZE;
        uv = (FRAGCOORD.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    } else {
        uv = UV * 2.0 - 1.0;
        uv.x *= local_aspect;
    }

    uv += uv_offset;

    float cursor_mask = 1.0;

    if (use_cursor_activation) {
        cursor_mask = get_cursor_activation_mask(original_uv);
    }

    vec2 p = uv;

    if (use_perspective_warp) {
        p = normalize(vec3(p.xy, perspective_depth)).xy;
    }

    p *= zoom;

    // --------------------------------------------------------
    // FLOW DIRECTION ROTATORIO
    // --------------------------------------------------------

    vec2 animated_flow = get_flow_direction(TIME);

    if (use_orbital_flow) {
        // Movimiento circular estable.
        // El patrón orbita indefinidamente sin deriva infinita.
        p += animated_flow * speed;
    } else {
        // Movimiento acumulativo.
        // Se parece más al comportamiento anterior, pero la dirección va girando.
        p += animated_flow * TIME * speed;
    }

    // --------------------------------------------------------
    // ACTIVACIÓN LOCAL POR CURSOR
    // --------------------------------------------------------

    if (use_cursor_activation) {
        vec2 cursor_centered = cursor_uv * 2.0 - 1.0;
        cursor_centered.x *= local_aspect;

        vec2 dir = uv - cursor_centered;

        p += normalize(dir + vec2(0.0001))
            * cursor_mask
            * cursor_motion_boost
            * sin(TIME * cursor_ripple_speed);
    }

    float v = pattern(TIME, p);

    if (use_cursor_activation) {
        float dist_to_cursor = get_cursor_distance(original_uv);

        float ripple = sin(
            dist_to_cursor * cursor_ripple_frequency
            - TIME * cursor_ripple_speed
        ) * 0.5 + 0.5;

        ripple *= cursor_mask;

        float wave_activation = mix(
            inactive_wave_strength,
            active_wave_strength,
            cursor_mask
        );

        v *= wave_activation;

        // Añade ondas circulares visibles dentro del radio del cursor.
        v += ripple * cursor_ripple_strength * cursor_mask;
    }

    float t = clamp(v, 0.0, 1.0);

    float local_contrast = contrast;

    if (use_cursor_activation) {
        local_contrast += cursor_mask * cursor_contrast_boost;
    }

    t = apply_contrast_custom(t, local_contrast);

    t = mix(gradient_center, t, gradation);
    t = clamp(t, 0.0, 1.0);

    if (invert_gradient) {
        t = 1.0 - t;
    }
	
	vec4 color_a = get_rainbow_color_a(TIME, SCREEN_UV);
    
	vec3 final_color = mix(color_a.rgb, color_b.rgb, t);

    vec4 tex = texture(TEXTURE, UV);

    if (multiply_texture_color) {
        final_color *= tex.rgb;
    }

    float final_alpha = alpha * color_a.a;

    if (use_texture_alpha) {
        final_alpha *= tex.a;
    }

    COLOR = vec4(final_color, final_alpha);
}