import { useState } from 'react';

import Button from '../ui/Button';

import volume from '../../assets/icons/volume.svg';
import volumeOff from '../../assets/icons/volume-off.svg';
import music from '../../assets/icons/music.svg';
import musicOff from '../../assets/icons/music-off.svg';
import questionMark from '../../assets/icons/question-mark.svg';
import cancel from '../../assets/icons/cancel.svg';

export default function Footer({ animateIn }) {
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const [helpOn, setHelpOn] = useState(false);

  function handleSoundClick() {
    setSoundOn((prevValue) => !prevValue);
  }

  function handleMusicClick() {
    setMusicOn((prevValue) => !prevValue);
  }

  function handleHelpClick() {
    setHelpOn((prevValue) => !prevValue);
  }

  return (
    <footer className={`footer ${animateIn ? 'active' : ''}`}>
      <div>
        <Button
          variant="secondary"
          icon={soundOn ? volume : volumeOff}
          alt={`volume ${soundOn ? 'on' : 'off'} icon`}
          aria-label={`volume ${soundOn ? 'on' : 'off'}`}
          onClick={handleSoundClick}
        />
        <Button
          variant="secondary"
          icon={musicOn ? music : musicOff}
          alt={`music ${musicOn ? 'on' : 'off'} icon`}
          aria-label={`music ${musicOn ? 'on' : 'off'}`}
          onClick={handleMusicClick}
        />
      </div>
      <Button
        variant="secondary"
        icon={!helpOn ? questionMark : cancel}
        alt={`${!helpOn ? 'help' : 'close help'} icon`}
        aria-label={`${!helpOn ? 'help' : 'close help'}`}
        onClick={handleHelpClick}
      />
    </footer>
  );
}
