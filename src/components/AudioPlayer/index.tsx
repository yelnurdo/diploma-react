import ReactAudioPlayer from "react-audio-player";
import styles from "./AudioPlayer.module.scss";

interface Props {
  audioUrl: string;
}

const AudioPlayer: React.FC<Props> = ({ audioUrl }) => {
  return <ReactAudioPlayer className={styles.player} src={audioUrl} controls></ReactAudioPlayer>;
};

export default AudioPlayer;
