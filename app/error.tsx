'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html>
            <body>
                <div className='m-16 text-center font-semibold text-xl'>
                    <h2 className='mb-2'>Something went wrong!</h2>
                    <Button
                        onClick={
                            () => reset()
                        }
                    >
                        Try again
                    </Button>
                </div>
            </body>
        </html>
    )
}