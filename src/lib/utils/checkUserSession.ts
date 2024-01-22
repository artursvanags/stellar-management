import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { User } from '@prisma/client';

import prismadb from '@/lib/utils/database';

type ErrorResponse = {
    message: string;
    status: number;
};

type SuccessResponse = {
    user: User | null;
    error?: ErrorResponse;
};

export async function checkUserSession(): Promise<SuccessResponse> {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return {
                user: null,
                error: { message: 'Session not found', status: 401 },
            };
        }

        const user = await prismadb.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return {
                user: null,
                error: { message: 'User not found', status: 404 },
            };
        }
        return { user };
    } catch (error) {
        console.error('checkUserSession:', error);
        return {
            user: null,
            error: { message: 'An unexpected error occurred', status: 500 },
        };
    }
}