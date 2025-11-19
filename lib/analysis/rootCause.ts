export type RootCauseNode = {
  name: string;
  value: number; // 0–1
  children: RootCauseNode[];
};

export const rootCauseTree: RootCauseNode = {
  name: "Kostenanstieg",
  value: 0.82,
  children: [
    {
      name: "Spitzenlast",
      value: 0.63,
      children: [
        { name: "Unnötige Lastspitzen", value: 0.41, children: [] },
        { name: "Abendfenster 18–22 Uhr", value: 0.32, children: [] }
      ]
    },

    {
      name: "Preisvolatilität",
      value: 0.71,
      children: [
        { name: "Kurzfristige Beschaffung", value: 0.52, children: [] },
        { name: "Abhängigkeit Erdgas", value: 0.44, children: [] }
      ]
    },

    {
      name: "Ineffizienzen",
      value: 0.46,
      children: [
        { name: "Blindleistung", value: 0.31, children: [] },
        { name: "Wärmeverluste", value: 0.22, children: [] }
      ]
    }
  ]
};
