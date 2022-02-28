export const hierarchies = [
    {
        id: 1,
        text: "category1",
        parentid: 0,
    },
    {
        id: 2,
        text: "category2",
        parentid: 0,
    },
    {
        id: 3,
        text: "category3",
        parentid: 0,
    },
    {
        id: 10,
        text: "category1-10",
        parentid: 1,
    },
    {
        id: 11,
        text: "category1-11",
        parentid: 1,
    },
    {
        id: 12,
        text: "category1-12",
        parentid: 1,
    },
    {
        id: 100,
        text: "category1-12-100",
        parentid: 12,
    },
]

export const hierarchies_nested = [
    {
      id: 1,
      text: "category1",
      parentid: 0,
      children: [
        {
          id: 102,
          text: "sub1",
          parentid: 1,
        },
        { id: 100, text: "sub2", parentid: 1, children: [] },
      ],
    },
    {
      id: 2,
      text: "category2",
      parentid: 0,
      children: [
        {
          id: 10111,
          text: "sub3",
          parentid: 2,
          children: [
            { id: 200, text: "sub3a", parentid: 10111, children: [] },
            {
              id: 201,
              text: "sub3b",
              parentid: 10111,
              children: [],
            },
          ],
        },
      ],
    },
  
    {
      id: 3,
      text: "category3",
      parentid: 0,
      children: [
        {
          id: 101,
          text: "sub4",
          parentid: 3,
          children: [
            {
              id: 300,
              text: "sub4a",
              parentid: 101,
              children: [
                {
                  id: 401,
                  text: "sub4b",
                  parentid: 300,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ];