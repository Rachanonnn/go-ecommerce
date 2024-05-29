interface UserData {
    user_id:    string;
	first_name: string; 
	last_name:  string; 
	email:     string;
	tel:       string;
	role:      string;
}

export default async function addUser({ user_id, first_name, last_name, email, tel, role }: UserData): Promise<any> {
    const data: UserData = {
        user_id,
        first_name,
        last_name,
        email,
        tel,
        role
    };

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/profile/add_user`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error('Server response (error):', responseText);
            let errorDetails;
            try {
                errorDetails = JSON.parse(responseText);
            } catch (e) {
                throw new Error(`Failed to fetch user: ${response.statusText}`);
            }
            throw new Error(`Failed to fetch user: ${errorDetails.message || response.statusText}`);
        }

        console.log('Server response (success):', responseText);
        let responseData;
        try {
            responseData = JSON.parse(responseText);
        } catch (e) {
            throw new Error('Invalid JSON response from server');
        }

        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
