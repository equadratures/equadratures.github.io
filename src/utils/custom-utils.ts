const CACHE_EXPIRATION_TIME = 3600000; // 1 hour in milliseconds

interface PypiStats {
    last_day: number | string;
    last_week: number | string;
    last_month: number | string;
}

interface PypiStatsApiResponse {
    data: PypiStats;
    package: string;
    type: string;
}


// Cache object for PyPI stats
const pypiCache: { [key: string]: { data: PypiStatsApiResponse, timestamp: number } } = {};

export async function fetchPyPIDownloadStats(package_name: string): Promise<PypiStatsApiResponse> {
    const cacheKey = `pypi_stats_${package_name}`; // Unique cache key for the package
    const currentTime = Date.now();

    // Check if the data is cached and valid (within expiration time)
    if (pypiCache[cacheKey] && (currentTime - pypiCache[cacheKey].timestamp) < CACHE_EXPIRATION_TIME) {
        console.log('Returning cached PyPI stats');
        return pypiCache[cacheKey].data; // Return cached data if valid
    }

    try {
        const pypistats_url = 'https://pypistats.org/api/packages/' + package_name + '/recent';
        const response = await fetch(pypistats_url, { mode: 'no-cors' });
        const data = await response.json();

        // Prepare the response object
        const result: PypiStatsApiResponse = {
            data: {
                last_day: data.data.last_day ?? '-',
                last_week: data.data.last_week ?? '-',
                last_month: data.data.last_month ?? '-',
            },
            package: package_name,
            type: "recent_downloads"
        };

        // Store the result in the cache with the current timestamp
        pypiCache[cacheKey] = { data: result, timestamp: currentTime };

        return result;
    } catch (error) {
        console.error('Error fetching ' + package_name + ' download stats:', error);
        // In case of an error, return a default fallback object
        return {
            data: {
                last_day: '-',
                last_month: '-',
                last_week: '-'
            },
            package: package_name,
            type: "recent_downloads"
        };
    }
}


interface GitHubStats {
    n_stars: number | string;
    n_forks: number | string;
    n_watchers: number | string;
}

// A simple in-memory cache object
const cache: { [key: string]: { data: GitHubStats, timestamp: number } } = {};

export async function fetchGitHubStats(github_org: string, github_repo: string): Promise<GitHubStats> {
    const cacheKey = `${github_org}/${github_repo}`; // Unique cache key for the repository
    const currentTime = Date.now();

    // Check if the data is cached and valid (within expiration time)
    if (cache[cacheKey] && (currentTime - cache[cacheKey].timestamp) < CACHE_EXPIRATION_TIME) {
        console.log('Returning cached data');
        return cache[cacheKey].data; // Return the cached data if valid
    }

    const github_api_url = `https://api.github.com/repos/${github_org}/${github_repo}`;
    const github_api = await fetch(github_api_url);
    const github_data = await github_api.json();

    const result: GitHubStats = {
        n_stars: github_data.stargazers_count ?? '-',
        n_forks: github_data.forks_count ?? '-',
        n_watchers: github_data.subscribers_count ?? '-'
    };

    // Store the result in the cache with the current timestamp
    cache[cacheKey] = { data: result, timestamp: currentTime };

    return result;
}

