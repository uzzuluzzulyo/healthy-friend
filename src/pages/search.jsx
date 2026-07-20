import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PageHeader from '../components/common/page-header.jsx';
import { supabase } from '../lib/supabase.js';
import { getCurrentUserId } from '../lib/auth.js';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();
    const userId = getCurrentUserId();
    if (!userId || !query.trim()) return;

    const { data } = await supabase
      .from('hf_mood_entries')
      .select('*')
      .eq('user_id', userId)
      .ilike('note', `%${query.trim()}%`)
      .order('created_at', { ascending: false });

    setResults(data ?? []);
    setSearched(true);
  }

  return (
    <Box sx={{ width: '100%', pb: 10 }}>
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
        <PageHeader title="내 기록 검색" backTo="/" />

        <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
          <TextField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="심리 기록 메모에서 검색"
            fullWidth
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {searched && results.length === 0 && (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
            검색 결과가 없어요.
          </Typography>
        )}

        <Stack spacing={1.5}>
          {results.map((entry) => (
            <Card key={entry.id} variant="outlined" sx={{ borderColor: 'divider' }}>
              <CardContent sx={{ py: '12px !important' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2} sx={{ flexWrap: 'wrap', rowGap: 0.5 }}>
                  <Typography sx={{ color: 'text.primary', fontWeight: 700 }}>{entry.mood}</Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                    {new Date(entry.created_at).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}
                  </Typography>
                </Stack>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mt: 0.5 }}>{entry.note}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default Search;
