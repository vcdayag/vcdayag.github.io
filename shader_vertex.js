const vertexShaderText =
`#version 300 es
in vec4 a_position;
in float a_point_size;
uniform mat4 u_transformation_matrix;
uniform mat4 u_model_matrix;
uniform mat4 u_view_matrix;
uniform mat4 u_projection_matrix;

uniform mat4 u_normal_matrix;
uniform vec3 a_normal;
uniform vec3 u_light_direction;
uniform vec3 u_light_diffuse;
uniform vec3 u_material_diffuse;

// uniform vec3 u_normal_matrix
// uniform vec3 corrected_a_normal
// uniform vec3 normalized_a_normal
// uniform vec3 normalized_u_light_direction
// uniform vec3 
// uniform vec3

in vec4 a_color; //attribute vec4 a_color;
out vec4 v_color; //varying vec4 v_color;

void main() {
    //Apply the transformations to the object to be rendered
    gl_Position = u_projection_matrix * u_transformation_matrix * u_view_matrix * u_model_matrix * a_position;
    gl_PointSize = a_point_size;

    v_color = a_color;

    vec3 corrected_a_normal = vec3(u_normal_matrix * vec4(a_normal, 1.0));
    vec3 normalized_a_normal = normalize(corrected_a_normal);
    vec3 normalized_u_light_direction = normalize(u_light_direction);
    float lambert_coefficient = dot(-normalized_u_light_direction, normalized_a_normal);
    lambert_coefficient = max(lambert_coefficient, 0.0);
    vec3 diffuse_color = u_light_diffuse * u_material_diffuse * lambert_coefficient;
    // v_color = vec4(diffuse_color, 1.0);
}
`;