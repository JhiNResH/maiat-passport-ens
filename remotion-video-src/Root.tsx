import { Composition } from "remotion";
import { MaiatPromoVideo } from "./MaiatPromoVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MaiatPromo"
        component={MaiatPromoVideo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
