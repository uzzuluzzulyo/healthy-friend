const BODY_COLOR = '#4FB89E';
const LEAF_COLOR = '#3D9E86';
const EYE_RING_COLOR = '#FFFFFF';

/**
 * SeedAvatar 컴포넌트
 *
 * 마스코트 캐릭터 "시드"(새싹 블롭)를 표현하는 아바타.
 * 플랫한 실루엣 + 크고 동그란 링 모양 눈 + 볼터치가 특징이며, 표정에 따라 눈/입이 바뀐다.
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
      {/* 새싹 줄기 + 잎 (몸통 뒤로) */}
      <line x1="60" y1="34" x2="60" y2="18" stroke={LEAF_COLOR} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="50" cy="16" rx="10" ry="6" fill={LEAF_COLOR} transform="rotate(-35 50 16)" />
      <ellipse cx="70" cy="16" rx="10" ry="6" fill={LEAF_COLOR} transform="rotate(35 70 16)" />

      {/* 몸통 (플랫 실루엣) */}
      <ellipse cx="60" cy="68" rx="42" ry="38" fill={BODY_COLOR} />

      {/* 아래쪽 발 (귀여움 포인트) */}
      <ellipse cx="34" cy="100" rx="10" ry="8" fill={BODY_COLOR} />
      <ellipse cx="86" cy="100" rx="10" ry="8" fill={BODY_COLOR} />

      {/* 화남: 찌푸린 눈썹 */}
      {isAngry && (
        <>
          <line x1="32" y1="48" x2="46" y2="54" stroke={EYE_RING_COLOR} strokeWidth="4" strokeLinecap="round" />
          <line x1="88" y1="48" x2="74" y2="54" stroke={EYE_RING_COLOR} strokeWidth="4" strokeLinecap="round" />
        </>
      )}

      {/* 볼터치 */}
      <ellipse cx="34" cy="76" rx="7" ry="4.5" fill="#FF9EB5" opacity={isHappy ? 0.9 : 0.55} />
      <ellipse cx="86" cy="76" rx="7" ry="4.5" fill="#FF9EB5" opacity={isHappy ? 0.9 : 0.55} />

      {/* 눈: 크고 동그란 링(도넛) 모양 */}
      <circle cx="44" cy="62" r="12" fill="none" stroke={EYE_RING_COLOR} strokeWidth="6" />
      <circle cx="76" cy="62" r="12" fill="none" stroke={EYE_RING_COLOR} strokeWidth="6" />

      {/* 슬픔: 눈물 */}
      {isSad && <path d="M 80 74 Q 85 82 80 88 Q 75 82 80 74 Z" fill="#8FD8FF" />}

      {/* 입 */}
      {isHappy && <path d="M 46 86 Q 60 96 74 86" stroke={EYE_RING_COLOR} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.9" />}
      {isSad && <path d="M 46 92 Q 60 84 74 92" stroke={EYE_RING_COLOR} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.9" />}
      {isAngry && <path d="M 48 88 L 72 88" stroke={EYE_RING_COLOR} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.9" />}
      {!isHappy && !isSad && !isAngry && (
        <path d="M 50 87 Q 60 91 70 87" stroke={EYE_RING_COLOR} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.9" />
      )}
    </svg>
  );
}

export default SeedAvatar;
