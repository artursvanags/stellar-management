import SWR from 'swr';

const fetcher = ( url: string ) => fetch(url).then(res => res.json());

export default function getFilaments() {
    const { data, error } = SWR(`/api/filaments`, fetcher);
    return { data, error };
}