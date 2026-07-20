import seedDefault from '../../assets/seed-default.png';
import seedHappy from '../../assets/seed-happy.png';
import seedSad from '../../assets/seed-sad.png';
import seedAngry from '../../assets/seed-angry.png';
import seedMeh from '../../assets/seed-meh.png';

const MOOD_IMAGES = {
  default: seedDefault,
  happy: seedHappy,
  sad: seedSad,
  angry: seedAngry,
  meh: seedMeh,
};

/**
 * SeedAvatar 컴포넌트
 *
 * 마스코트 캐릭터 "시드" 원본 이미지를 그대로 보여준다.
 *
 * Props:
 * @param {number} size - 아바타 크기(px) [Optional, 기본값: 56]
 * @param {'default'|'happy'|'sad'|'angry'|'meh'} mood - 표정 [Optional, 기본값: 'default']
 *
 * Example usage:
 * <SeedAvatar size={80} mood="happy" />
 */
function SeedAvatar({ size = 56, mood = 'default' }) {
  const src = MOOD_IMAGES[mood] ?? MOOD_IMAGES.default;

  return (
    <img
      src={src}
      alt="시드"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  );
}

export default SeedAvatar;
