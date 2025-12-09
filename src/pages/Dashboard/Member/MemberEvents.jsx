import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaCalendarAlt, FaMoneyBillAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MemberEvents = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // 1. Load events only from clubs the member has joined
    const { data: events = [], isLoading } = useQuery({
        queryKey: ['memberEvents', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/member/events?email=${user.email}`);
            return res.data;
        },
    });

    // 2. Check registration status (assumed provided by the server)
    const isAlreadyRegistered = (eventId) => {
        const event = events.find(e => e._id === eventId);
        return event?.isRegistered || false; 
    };

    // 3. Event Registration Mutation
    const registerMutation = useMutation({
        mutationFn: async ({ eventId, eventFee }) => {
            const res = await axiosSecure.post(`/events/register/${eventId}`, {
                userEmail: user.email,
                eventFee: eventFee
            });
            return res.data;
        },
        onSuccess: (data) => {
            // If payment URL is returned (Paid Event)
            if (data.url) {
                window.location.assign(data.url);
                return;
            }
            
            // Free event or post-payment success
            Swal.fire('Success!', 'Successfully registered for the event!', 'success');
            queryClient.invalidateQueries(['memberEvents']);
            queryClient.invalidateQueries(['myEvents']); 
        },
        onError: (error) => {
            Swal.fire('Error', error.response?.data?.message || 'Registration failed.', 'error');
        },
    });

    const handleRegister = (event) => {
        const eventId = event._id;
        const eventFee = event.eventFee || 0;

        if (isAlreadyRegistered(eventId)) {
            Swal.fire('Info', 'You are already registered for this event.', 'info');
            return;
        }

        Swal.fire({
            title: eventFee > 0 ? `Confirm Payment of $${eventFee}` : 'Confirm Registration', // Changed ৳ to $
            text: eventFee > 0 ? "You will be redirected to Stripe for payment." : "You are about to register for this free event.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: eventFee > 0 ? 'Proceed to Pay' : 'Confirm',
        }).then((result) => {
            if (result.isConfirmed) {
                registerMutation.mutate({ eventId, eventFee });
            }
        });
    };

    if (isLoading) {
        return <div className="text-center py-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (events.length === 0) {
        return <p className="text-center py-10 text-neutral">No upcoming events found from your joined clubs.</p>;
    }

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold mb-6">Upcoming Club Events</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <p className="text-sm text-primary font-semibold">{event.clubName}</p>
                            <h2 className="card-title text-xl">{event.title}</h2>
                            <p className="text-sm text-neutral">{event.description.substring(0, 100)}...</p>
                            
                            <div className="flex items-center gap-4 mt-3 text-sm">
                                <div className="flex items-center gap-1">
                                    <FaCalendarAlt className="text-accent" />
                                    <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaMoneyBillAlt className="text-accent" />
                                    <span>{event.isPaid ? `$ ${event.eventFee}` : 'Free'}</span> {/* Changed ৳ to $ */}
                                </div>
                            </div>

                            <div className="card-actions justify-end mt-4">
                                <button
                                    onClick={() => handleRegister(event)}
                                    disabled={isAlreadyRegistered(event._id) || registerMutation.isPending}
                                    className={`btn btn-sm ${isAlreadyRegistered(event._id) ? 'btn-disabled' : 'btn-primary'}`}
                                >
                                    {isAlreadyRegistered(event._id) ? 'Registered' : 'Register Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberEvents;