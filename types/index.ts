interface IWeathet {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ILocation {
  name: string;
  main: {
    temp: number;
  };
  weather: IWeathet[];
}
