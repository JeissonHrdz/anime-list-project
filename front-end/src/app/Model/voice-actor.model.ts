export interface voiceActors {
    id: number;
    name: VoiceActorName;
    image: Image; 
 }

 interface VoiceActorName {
    first: string;
    last: string;
  }

  interface Image {
    large: string;
  }