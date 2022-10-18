/*
    Shaders . JS

    By Nathan

    Imports:
        N / A

    Exports:
        shaders (object[array[string]]) - Exports all webGL shaders as strings within arrays for each shader type. Main is 0.
*/

export default {
    vertex:
    [
        `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
                
        uniform mat3 u_world;
        uniform mat3 u_object;
        uniform vec2 u_frame;
                
        varying vec2 v_texCoord;

        void main()
        {
            gl_Position = vec4( u_world * u_object * vec3(a_position, 1.0), 1.0);
            v_texCoord = a_texCoord + u_frame;
        }
        `,
    ],

    fragment:
    [
        `
        precision mediump float;
        uniform sampler2D u_image;
        varying vec2 v_texCoord;
                
        void main()
        {
            gl_FragColor = texture2D(u_image, v_texCoord);
        }
        `
    ]
}
