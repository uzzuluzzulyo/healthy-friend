const BODY_COLOR = '#7ED9C7';
const LEAF_COLOR = '#43A05F';
const EYE_DARK = '#1B1B1B';
const EYE_YELLOW = '#FFD84D';

/**
 * SeedAvatar 컴포넌트
 *
 * 마스코트 캐릭터 "시드"(민트색 새싹 캐릭터) 아바타.
 * 원본 브랜드 가이드의 캐릭터 감정표현(기본/행복/슬픔/화남/그럭저럭)을 그대로 따른다.
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
      {/* 새싹 줄기 + 잎 */}
      <line x1="60" y1="24" x2="60" y2="10" stroke={LEAF_COLOR} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="52" cy="10" rx="8" ry="5" fill={LEAF_COLOR} transform="rotate(-35 52 10)" />
      <ellipse cx="68" cy="10" rx="8" ry="5" fill={LEAF_COLOR} transform="rotate(35 68 10)" />

      {/* 몸통 */}
      <circle cx="60" cy="64" r="44" fill={BODY_COLOR} />

      {/* 화남: 상단 붉은 기운 */}
      {isAngry && <ellipse cx="60" cy="38" rx="36" ry="18" fill="#F26D6D" opacity="0.4" />}

      {isSad ? (
        <>
          {/* 슬픔: 감은 눈 + 눈물 */}
          <path d="M 37 60 Q 44 54 51 60" stroke={EYE_DARK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 69 60 Q 76 54 83 60" stroke={EYE_DARK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 79 68 Q 85 78 79 86 Q 73 78 79 68 Z" fill="#8FD3F4" />
        </>
      ) : (
        <>
          {/* 기본/행복/화남/그럭저럭: 검정+노랑 눈 (가운데 정렬 + 하이라이트) */}
          <circle cx="44" cy="61" r="9" fill={EYE_YELLOW} />
          <circle cx="44" cy="61" r="5.5" fill={EYE_DARK} />
          <circle cx="42" cy="59" r="1.8" fill="#FFFFFF" />
          <circle cx="76" cy="61" r="9" fill={EYE_YELLOW} />
          <circle cx="76" cy="61" r="5.5" fill={EYE_DARK} />
          <circle cx="74" cy="59" r="1.8" fill="#FFFFFF" />
        </>
      )}

      {/* 행복: 볼터치 */}
      {isHappy && (
        <>
          <ellipse cx="38" cy="78" rx="7" ry="4.5" fill="#FF9EB0" opacity="0.85" />
          <ellipse cx="82" cy="78" rx="7" ry="4.5" fill="#FF9EB0" opacity="0.85" />
        </>
      )}
    </svg>
  );
}

export default SeedAvatar;
