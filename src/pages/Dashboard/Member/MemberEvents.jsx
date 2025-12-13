import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaCalendarAlt, FaMoneyBillAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
        },
    }),
};

const MemberEvents = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: events = [], isLoading } = useQuery({
        queryKey: ['memberEvents', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/member/events?email=${user.email}`
            );
            return res.data;
        },
    });

    const isAlreadyRegistered = (eventId) =>
        events.find(e => e._id === eventId)?.isRegistered || false;

    const registerMutation = useMutation({
        mutationFn: async ({ eventId, eventFee }) => {
            const res = await axiosSecure.post(
                `/events/register/${eventId}`,
                { userEmail: user.email, eventFee }
            );
            return res.data;
        },

        onSuccess: (data) => {
            if (data?.url) {
                window.location.assign(data.url);
                return;
            }

            Swal.fire('Success!', 'Successfully registered!', 'success');
            queryClient.invalidateQueries(['memberEvents', user.email]);
            queryClient.invalidateQueries(['myEvents']);
        },

        onError: (error) => {
            Swal.fire(
                'Error',
                error.response?.data?.message || 'Registration failed',
                'error'
            );
        },
    });

    const handleRegister = (event) => {
        if (isAlreadyRegistered(event._id)) {
            Swal.fire('Info', 'Already registered!', 'info');
            return;
        }

        const fee = event.eventFee || 0;

        Swal.fire({
            title: fee > 0
                ? `Confirm Payment $${fee}`
                : 'Confirm Registration',
            text: fee > 0
                ? 'You will be redirected to Stripe.'
                : 'This is a free event.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: fee > 0 ? 'Pay Now' : 'Confirm',
        }).then(result => {
            if (result.isConfirmed) {
                registerMutation.mutate({
                    eventId: event._id,
                    eventFee: fee,
                });
            }
        });
    };

 
    if (isLoading) {
        return (
            <div className="text-center py-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!events.length) {
        return (
            <p className="text-center py-10 text-neutral">
                No upcoming events from your joined clubs.
            </p>
        );
    }

   
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6"
        >
            <h3 className="text-2xl font-bold mb-6">
                Upcoming Club Events
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                    <motion.div
                        key={event._id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.03 }}
                        className="card bg-base-100 shadow-xl"
                    >
                        <div className="card-body">
                            {/* Club Name */}
                            <p className="text-sm text-primary font-semibold">
                                {event.clubName}
                            </p>

                            {/* Event Title */}
                            <h2 className="card-title text-xl">
                                {event.title}
                            </h2>

                            {/* Description */}
                            <p className="text-sm text-neutral">
                                {event.description?.slice(0, 120)}...
                            </p>

                            {/* Date & Fee */}
                            <div className="flex items-center gap-4 mt-3 text-sm">
                                <div className="flex items-center gap-1">
                                    <FaCalendarAlt className="text-accent" />
                                    <span>
                                        {new Date(event.eventDate).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <FaMoneyBillAlt className="text-accent" />
                                    <span>
                                        {event.isPaid
                                            ? `$ ${event.eventFee}`
                                            : 'Free'}
                                    </span>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="card-actions justify-end mt-4">
                                <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={
                                        isAlreadyRegistered(event._id) ||
                                        registerMutation.isPending
                                    }
                                    onClick={() => handleRegister(event)}
                                    className={`btn btn-sm ${
                                        isAlreadyRegistered(event._id)
                                            ? 'btn-disabled'
                                            : 'btn-primary'
                                    }`}
                                >
                                    {isAlreadyRegistered(event._id)
                                        ? 'Registered'
                                        : 'Register Now'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default MemberEvents;
