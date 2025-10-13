'use client';
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { IconBrandLinkedin } from '@tabler/icons-react'
import { CONTAINER_PADDING } from '@/lib/styles'

interface TeamMember {
  _id: string
  name: string
  role: string
  image?: string
  linkedin?: string
  status: string
}

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          const data = await res.json();
          setTeamMembers(data.teamMembers);
        } else {
          setError('Failed to load team members');
        }
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members');
      } finally {
        setLoading(false);
      }
    }
    fetchTeamMembers();
  }, []);
  if (loading) {
    return (
      <div className={`${CONTAINER_PADDING} py-16`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${CONTAINER_PADDING} py-16`}>
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className={`${CONTAINER_PADDING} py-16`}>
        <div className="text-center text-gray-600">
          <p>No team members to display at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${CONTAINER_PADDING} py-16`}>
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Meet Our Team
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          The passionate people behind Baazizi Group, dedicated to transforming the construction materials industry
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative h-72 overflow-hidden bg-gradient-to-br from-orange-100 to-orange-50">
              {member.image && member.image.trim() !== '' ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-orange-100">
                  <span className="text-6xl font-bold text-orange-500">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-orange-500 font-semibold mb-3">
                {member.role}
              </p>

              {/* LinkedIn Button */}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group/link"
                >
                  <IconBrandLinkedin
                    size={24}
                    className="group-hover/link:scale-110 transition-transform"
                  />
                  <span className="text-sm">Connect on LinkedIn</span>
                </a>
              )}
            </div>

            {/* Decorative element */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-orange-500 rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="inline-block bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 max-w-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Want to Join Our Team?
          </h3>
          <p className="text-gray-600 mb-6">
            We're always looking for talented individuals to join our mission
          </p>
          <a
            href="/work-with-us"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </div>
  )
}

export default TeamSection
