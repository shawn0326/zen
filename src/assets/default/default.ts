namespace zen.def {
    // draw CCW by default

    export const plane_mesh:string = JSON.stringify({
        "position": [],
        "uv": [],
        "normal": [],
        "indices": [],
        "sub": [{}]
    });

    export const cube_mesh:string = JSON.stringify({
        "position": [
            // bottom
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            // top
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,
            // back
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,
            // front
            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            // right
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,
            // left
            -0.5, -0.5, 0.5,
            -0.5, -0.5, -0,5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5     
        ],
        "uv": [
            // bottom
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            // top
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            // back
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            // front
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            // left
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            // right
            0, 0,
            0, 1,
            1, 1,
            1, 0
        ],
        "normal": [
            // bottom
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            // top
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            // back
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // front
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            // left
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            // right
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0
        ],
        "indices": [
            // bottom
            0, 1, 2, 2, 3, 0,
            // top
            4, 5, 6, 6, 7, 4,
            // back
            8, 9, 10, 10, 11, 8,
            // front
            12, 13, 14, 14, 15, 12,
            // letf
            16, 17, 18, 18, 19, 16,
            // right
            20, 21, 22, 22, 23, 20
        ],
        "sub": [{
            start: 0, count: 36, materialId: 0
        }]
    });

    export let diffuse_shader:string = JSON.stringify({
        vs: [
            "attribute vec3 a_position;",
            "uniform mat4 u_pvm;",
            "void main() {",
                "gl_Position = u_pvm * vec4(a_position.xyz, 1.0);",
            "}"
        ].join("\n"),
        fs: [
            "uniform vec4 u_mainColor;",
            "void main() {",
                "gl_FragColor = u_mainColor;",
            "}"
        ].join("\n")
    });
}