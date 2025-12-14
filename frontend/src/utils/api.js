
const API_BASE = '/api';

/**
 * Utilitário para gerenciar tokens no localStorage
 */
export const auth = {
    getToken: () => localStorage.getItem('authToken'),
    setToken: (token) => localStorage.setItem('authToken', token),
    getRefreshToken: () => localStorage.getItem('refreshToken'),
    setRefreshToken: (token) => localStorage.setItem('refreshToken', token),
    clearTokens: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
    },
    isAuthenticated: () => !!localStorage.getItem('authToken')
};

/**
 * Função Wrapper do Fetch para lidar com refresh token e auth headers
 */
export const apiFetch = async (endpoint, options = {}) => {
    const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

    // Headers padrão
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Anexa token se existir
    const token = auth.getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    let response = await fetch(url, { ...options, headers });

    // Se der 401 (Unauthorized) e tivermos um refresh token, tenta renovar
    if (response.status === 401 && auth.getRefreshToken()) {
        try {
            // Tenta refresh
            const refreshRes = await fetch(`${API_BASE}/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: auth.getRefreshToken() })
            });

            if (refreshRes.ok) {
                const data = await refreshRes.json();
                auth.setToken(data.token); // Atualiza token

                // Refaz a requisição original com o novo token
                headers['Authorization'] = `Bearer ${data.token}`;
                response = await fetch(url, { ...options, headers });
            } else {
                // Refresh falhou (expirado ou inválido)
                auth.clearTokens();
                window.location.href = '/login'; // Força logout
            }
        } catch (e) {
            auth.clearTokens();
            window.location.href = '/login';
        }
    } else if (response.status === 401) {
        // 401 sem refresh token
        auth.clearTokens();
        window.location.href = '/login';
    }

    return response;
};
