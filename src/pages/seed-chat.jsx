import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SeedAvatar from '../components/ui/seed-avatar.jsx';
import { supabase } from '../lib/supabase.js';
import { getCurrentUserId } from '../lib/auth.js';

const SEED_REPLIES = [
  '오늘도 정말 수고 많았어요! 잠깐이라도 쉬어가는 거 잊지 마세요.',
  '힘든 하루였군요. 저는 언제든 여기서 이야기 들어줄게요.',
  '오늘 하루도 애썼어요, 헬시님 최고예요!',
  '조금 지쳐 보이네요. 물 한 잔 마시고 심호흡 한 번 해볼까요?',
  '그런 날도 있는 거예요. 내일은 좀 더 나을 거예요!',
];

function getSeedReply() {
  return SEED_REPLIES[Math.floor(Math.random() * SEED_REPLIES.length)];
}

function SeedChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  const fetchMessages = async () => {
    const userId = getCurrentUserId();
    if (!userId) return;

    const { data } = await supabase
      .from('hf_chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .limit(100);
    setMessages(data ?? []);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(event) {
    event.preventDefault();
    const userId = getCurrentUserId();
    const trimmed = input.trim();
    if (!userId || !trimmed || sending) return;

    setSending(true);
    setInput('');

    await supabase.from('hf_chat_messages').insert({ user_id: userId, sender: 'user', message: trimmed });
    await supabase.from('hf_chat_messages').insert({ user_id: userId, sender: 'seed', message: getSeedReply() });

    await fetchMessages();
    setSending(false);
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', pb: 10 }}>
      <Container maxWidth="sm" sx={{ pt: { xs: 2, md: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
          <SeedAvatar size={40} mood="happy" />
          <Typography sx={{ color: 'text.primary', fontWeight: 700 }}>시드와 대화하기</Typography>
        </Stack>

        <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem', mb: 2 }}>
          * 프로토타입 단계라 시드는 미리 준비된 문장으로 답해요. 실제 AI 대화는 다음 개발 단계에서 추가될 예정이에요.
        </Typography>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
          <Stack spacing={1.5}>
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  bgcolor: msg.sender === 'user' ? 'primary.main' : 'background.paper',
                  color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                  border: msg.sender === 'user' ? 'none' : '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  px: 2,
                  py: 1,
                }}
              >
                <Typography sx={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{msg.message}</Typography>
              </Box>
            ))}
            <div ref={bottomRef} />
          </Stack>
        </Box>
      </Container>

      <Box
        component="form"
        onSubmit={handleSend}
        sx={{ position: 'fixed', bottom: 56, left: 0, right: 0, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', p: 1.5 }}
      >
        <Container maxWidth="sm" sx={{ display: 'flex', gap: 1 }}>
          <TextField
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="메시지 입력하기"
            fullWidth
            size="small"
          />
          <IconButton type="submit" disabled={sending} sx={{ color: 'primary.main' }}>
            <SendRoundedIcon />
          </IconButton>
        </Container>
      </Box>
    </Box>
  );
}

export default SeedChat;
