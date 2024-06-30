import { NextResponse } from "next/server";

export async function GET(request: Request) {
     try {
          const { searchParams } = new URL(request.url);
          const username = searchParams.get('username');

          const url = `https://api.clerk.com/v1/users?username=${username}`;

          const response = await fetch(url.toString(), {
               headers: {
                    'Authorization': 'Bearer sk_test_tSpFJtHt0U1fGttPi5s0wbphMQAtk8IQfk6nbur9Yd',
                    'Content-Type': 'application/json'
               }
          });

          const data = await response.json();

          if (!response.ok) return NextResponse.json({ error: data.errors || 'An error occurred' }, { status: response.status });

          return NextResponse.json(data);
     }
     
     catch (error: any) {
          console.log("error: " + error);
          return NextResponse.json({ error: 'An error occurred: ' + error }, { status: 500 });
     }
}