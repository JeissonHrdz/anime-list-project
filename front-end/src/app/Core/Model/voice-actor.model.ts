import { Character } from "./character.model";

export interface voiceActors {
    id: number;
    name: VoiceActorName;
    image: Image; 
    decription: string;
    gender: string;
    dateOfBirth: DateOfBirth
    dateOfDeath: DateOfDeath
    age: number;
    homeTown: string;
    siteUrl: string;
    characters: Character[]
 }

 interface VoiceActorName {
    first: string;
    last: string;
    native: string;
    alternative: string[];
  }

  interface Image {
    large: string;
  }

  interface DateOfBirth {
    day: number;
    month: number;   
    year: number;   
  }

  interface DateOfDeath {
    day: number;
    month: number;   
    year: number;   
  }