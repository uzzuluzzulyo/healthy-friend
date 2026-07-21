import { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '../theme.js';

const STORAGE_KEY = 'hf-color-mode';

const ColorModeContext = createContext({ mode: 'light', toggleMode: () => {} });

function getInitialMode() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * ColorModeProvider 컴포넌트
 *
 * 라이트/다크 모드 상태를 관리하고 MUI 테마를 제공한다. localStorage에 선택을 저장한다.
 *
 * Props:
 * @param {node} children - 하위 트리 [Required]
 *
 * Example usage:
 * <ColorModeProvider><App /></ColorModeProvider>
 */
export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem(STORAGE_KEY, next);
          return next;
        });
      },
    }),
    [mode],
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

/**
 * useColorMode 훅
 *
 * 현재 다크모드 여부와 토글 함수를 반환한다.
 *
 * Example usage:
 * const { mode, toggleMode } = useColorMode();
 */
export function useColorMode() {
  return useContext(ColorModeContext);
}
