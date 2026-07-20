const BODY_COLOR = '#7DD9C4';
const BODY_STROKE = '#4FB89E';
const LEAF_COLOR = '#4CAF7D';
const FACE_COLOR = '#1A2733';

/**
 * SeedAvatar 컴포넌트
 *
 * 마스코트 캐릭터 "시드"(새싹 블롭)를 표현하는 아바타. 표정에 따라 눈/입/장식이 바뀐다.
 *
 * Props:
 * @param {number} size - 아바타 크기(px) [Optional, 기본값: 56]
 * @param {'default'|'happy'|'sad'|'angry'} mood - 표정 [Optional, 기본값: 'default']
 *
 * Example usage:
 * <SeedAvatar size={80} mood="happy" />
 */
function SeedAvatar({ size = 56, mood = 'default' }) {
  const isHappy = mood === 'happy';
  const isSad = mood === 'sad';
  const isAngry = mood === 'angry';

  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* 몸통 */}
      <ellipse cx="60" cy="68" rx="40" ry="36" fill={BODY_COLOR} stroke={BODY_STROKE} strokeWidth="2" />

      {/* 화남: 상단에 붉은 기운 */}
      {isAngry && <ellipse cx="60" cy="42" rx="34" ry="16" fill="#FF6B6B" opacity="0.35" />}

      {/* 새싹 줄기 + 잎 */}
      <line x1="60" y1="32" x2="60" y2="16" stroke={LEAF_COLOR} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="50" cy="15" rx="10" ry="6" fill={LEAF_COLOR} transform="rotate(-35 50 15)" />
      <ellipse cx="70" cy="15" rx="10" ry="6" fill={LEAF_COLOR} transform="rotate(35 70 15)" />

      {/* 화남: 찌푸린 눈썹 */}
      {isAngry && (
        <>
          <line x1="36" y1="50" x2="48" y2="54" stroke={FACE_COLOR} strokeWidth="3" strokeLinecap="round" />
          <line x1="84" y1="50" x2="72" y2="54" stroke={FACE_COLOR} strokeWidth="3" strokeLinecap="round" />
        </>
      )}

      {/* 눈 */}
      <circle cx="46" cy="62" r="5" fill={FACE_COLOR} />
      <circle cx="74" cy="62" r="5" fill={FACE_COLOR} />

      {/* 행복: 볼터치 */}
      {isHappy && (
        <>
          <ellipse cx="36" cy="76" rx="6" ry="4" fill="#FF9EB5" opacity="0.7" />
          <ellipse cx="84" cy="76" rx="6" ry="4" fill="#FF9EB5" opacity="0.7" />
        </>
      )}

      {/* 슬픔: 눈물 */}
      {isSad && (
        <path
          d="M 78 68 Q 82 76 78 82 Q 74 76 78 68 Z"
          fill="#6EC3F4"
        />
      )}

      {/* 입 */}
      {isHappy && <path d="M 46 82 Q 60 94 74 82" stroke={FACE_COLOR} strokeWidth="3" fill="none" strokeLinecap="round" />}
      {isSad && <path d="M 46 88 Q 60 78 74 88" stroke={FACE_COLOR} strokeWidth="3" fill="none" strokeLinecap="round" />}
      {isAngry && <path d="M 46 84 L 74 84" stroke={FACE_COLOR} strokeWidth="3" fill="none" strokeLinecap="round" />}
      {!isHappy && !isSad && !isAngry && (
        <path d="M 48 83 Q 60 87 72 83" stroke={FACE_COLOR} strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
}

export default SeedAvatar;
