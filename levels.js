//pal1: {hsl:[127, 55, 12]}, pal2: {hsl:[127, 55, 40]}

var levels = {data: [
    //TUTORIAL
    {
        gridsize: [6, 3], goal:[4, 1], px: 1, py: 1, pal1: {hsl:[0, 0, 70]}, pal2: {hsl:[0, 0, 5]}, 
        walls:[[[0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]],

               [[0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]]],

        box:[[0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0]]
    },
    {
        gridsize: [8, 5], goal:[7, 4], px: 0, py: 0, pal1: {hsl:[0, 0, 70]}, pal2: {hsl:[0, 0, 5]}, 
        walls:[[[0, 1, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 1, 1],
                [0, 0, 0, 0, 1, 0, 0, 0],
                [1, 1, 1, 0, 1, 1, 1, 0],
                [0, 0, 0, 0, 1, 0, 0, 0]],

               [[0, 1, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 1, 1],
                [0, 0, 0, 0, 1, 0, 0, 0],
                [1, 1, 1, 0, 1, 1, 1, 0],
                [0, 0, 0, 0, 1, 0, 0, 0]]],

        box:[[0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0]]
    },
    {
        gridsize: [7, 3], goal:[6, 1], px: 0, py: 1, pal1: {hsl:[0, 0, 70]}, pal2: {hsl:[0, 0, 5]}, 
        walls:[[[0, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0],
                [0, 1, 0, 0, 0, 0, 0]],

               [[0, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0], 
                [0, 1, 0, 0, 0, 0, 0]]],
        
        box:[[0, 0, 0, 0, 0, 0, 0],
             [0, 0, 1, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0]]
    },
    {
        gridsize: [5, 1], goal:[4, 0], px: 0, py: 0, pal1: {hsl:[0, 0, 70]}, pal2: {hsl:[0, 0, 5]}, 
        walls:[[[0, 0, 1, 0, 0]],

               [[0, 0, 0, 0, 0]]],
        
        box:[[0, 0, 0, 0, 0]]
    },
    //STG 1
    {
        gridsize: [6, 3], goal:[4, 1], px: 1, py: 1, pal1: {hsl:[195, 22, 10]}, pal2: {hsl:[195, 65, 75]}, 
        walls:[[[0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]],

               [[0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]]],
        
        box:[[0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0]]
    },
    {
        gridsize: [4, 3], goal:[3, 2], px: 0, py: 0, pal1: {hsl:[195, 22, 10]}, pal2: {hsl:[195, 65, 75]}, 
        walls:[[[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

               [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]]],
        
        box:[[0, 1, 0, 1],
             [1, 0, 1, 0],
             [0, 1, 0, 0]]
    },
    {
        gridsize: [4, 4], goal:[2, 0], px: 0, py: 1, pal1: {hsl:[195, 22, 10]}, pal2: {hsl:[195, 65, 75]}, 
        walls:[[[0, 1, 0, 0],
                [0, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 1, 0]],

               [[0, 1, 0, 0],
                [0, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 1, 0]]],
        
        box:[[0, 0, 0, 0],
             [0, 1, 0, 1],
             [0, 1, 0, 0],
             [0, 0, 0, 0]]
    },
    {
        gridsize: [8, 5], goal:[7, 4], px: 0, py: 1, pal1: {hsl:[195, 22, 10]}, pal2: {hsl:[195, 65, 75]}, 
        walls:[[[0, 0, 1, 0, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 1, 0, 1, 0],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0]],

               [[0, 0, 1, 0, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 1, 0, 1, 0],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0]]],
        
        box:[[0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 0, 1, 0, 1, 0, 0],
             [0, 0, 1, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 1, 0, 0],
             [0, 0, 0, 0, 1, 0, 0, 0]]
    },
    {
        gridsize: [5, 4], goal:[4, 3], px: 1, py: 1, pal1: {hsl:[195, 22, 10]}, pal2: {hsl:[195, 65, 75]}, 
        walls:[[[0, 1, 0, 0, 0],
                [1, 1, 1, 0, 0],
                [0, 1, 0, 0, 0],
                [0, 1, 1, 1, 0]],

               [[0, 1, 0, 0, 0],
                [1, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0]]],
        
        box:[[1, 0, 0, 0, 1],
             [0, 0, 1, 1, 0],
             [1, 0, 0, 1, 0],
             [1, 0, 0, 0, 0]]
    },
    {
        gridsize: [8, 5], goal:[7, 2], px: 0, py: 2, pal1: {hsl:[195, 22, 10]}, pal2: {hsl:[195, 65, 75]}, 
        walls:[[[0, 0, 1, 1, 0, 0, 1, 0],
                [1, 1, 1, 0, 1, 1, 1, 0],
                [0, 1, 0, 1, 1, 0, 1, 1],
                [0, 1, 0, 1, 0, 1, 1, 0],
                [0, 0, 1, 1, 0, 1, 0, 0]],

               [[0, 0, 1, 0, 0, 1, 1, 1],
                [1, 0, 0, 1, 1, 0, 1, 1],
                [0, 1, 1, 1, 0, 1, 1, 0],
                [1, 1, 0, 1, 1, 1, 1, 1],
                [1, 0, 0, 1, 0, 0, 0, 1]]],

        box:[[0, 0, 0, 0, 0, 0, 0, 0], 
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0]]
    },
    //STG 2
    {
        gridsize: [6, 3], goal:[5, 1], px: 0, py: 1, pal1: {hsl:[127, 55, 40]}, pal2: {hsl:[35, 55, 12]}, 
        walls:[[[0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0]],

               [[0, 0, 1, 0, 0, 0],
                [1, 0, 0, 1, 0, 0],
                [1, 0, 0, 1, 0, 0]]],
        
        box:[[0, 0, 0, 0, 0, 1],
             [0, 1, 1, 0, 0, 0],
             [0, 0, 0, 0, 0, 1]]
    },
    {
        gridsize: [8, 5], goal:[7, 4], px: 0, py: 0, pal1: {hsl:[127, 55, 40]}, pal2: {hsl:[35, 55, 12]}, 
        walls:[[[0, 1, 0, 1, 0, 1, 1, 0],
                [1, 1, 1, 1, 1, 0, 1, 1],
                [0, 1, 0, 1, 1, 1, 0, 1],
                [1, 1, 1, 0, 1, 1, 1, 0],
                [0, 1, 0, 1, 1, 1, 0, 1]],

               [[1, 1, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 1, 1, 1, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 0, 1, 0, 1, 0]]],

        box:[[0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0]]
    },
    {
        gridsize: [7, 5], goal:[6, 2], px: 0, py: 2, pal1: {hsl:[127, 55, 40]}, pal2: {hsl:[35, 55, 12]}, 
        walls:[[[0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]],

               [[0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]]],
        
        box:[[0, 1, 0, 1, 0, 1, 0],
             [0, 0, 1, 0, 1, 1, 0],
             [0, 1, 0, 1, 1, 0, 0],
             [0, 0, 1, 0, 1, 1, 0],
             [0, 1, 0, 1, 0, 1, 0]]
    },
    {
        gridsize: [10, 3], goal:[9, 1], px: 0, py: 1, pal1: {hsl:[127, 55, 40]}, pal2: {hsl:[35, 55, 12]}, 
        walls:[[[0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 1, 1, 0, 1, 1, 0, 0, 0]],

               [[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 1, 1, 1, 0, 0]]],
        
        box:[[0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
             [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
             [0, 0, 0, 0, 1, 0, 0, 0, 0, 1]]
    },
    {
        gridsize: [9, 5], goal:[8, 4], px: 0, py: 0, pal1: {hsl:[127, 55, 40]}, pal2: {hsl:[35, 55, 12]}, 
        walls:[[[0, 0, 1, 0, 1, 0, 1, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 0],
                [0, 0, 1, 0, 1, 0, 1, 0, 0]],

               [[1, 0, 0, 0, 1, 0, 0, 0, 1],
                [0, 1, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 1, 0],
                [1, 0, 0, 0, 1, 0, 0, 0, 1]]],
        
        box:[[0, 1, 0, 0, 0, 1, 0, 0, 1],
             [0, 0, 0, 1, 1, 0, 0, 0, 0],
             [0, 1, 1, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 1, 1, 0, 1, 0, 0],
             [0, 1, 0, 0, 0, 1, 0, 1, 0]]
    },
    //STG 3
    {
        gridsize: [6, 3], goal:[4, 1], px: 1, py: 1, pal1: {hsl:[270, 80, 70]}, pal2: {hsl:[15, 100, 30]}, 
        walls:[[[0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]],

               [[0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]]],

        box:[[0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0]]
    },
    {
        gridsize: [16, 9], goal:[0, 8], px: 0, py: 0, pal1: {hsl:[270, 80, 70]}, pal2: {hsl:[15, 100, 30]}, 
        walls:[[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],

               [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]],

        box:[[0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
             [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
             [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
             [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
             [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
             [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
             [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]]
    },
    //FINAL STG
    {
        gridsize: [6, 3], goal:[4, 1], px: 1, py: 1, pal1: {hsl:[0, 0, 100]}, pal2: {hsl:[0, 0, 0]}, 
        walls:[[[0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]],

               [[0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]]],

        box:[[0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0]]
    },
]}
