<script lang="ts">
	import ProfileHeader from '~/lib/features/ProfileHeader.svelte';
	import ProfileStats from '~/lib/features/ProfileStats.svelte';
	import ProfileTabs from '~/lib/features/ProfileTabs.svelte';
	import ProfileContent from '~/lib/features/ProfileContent.svelte';
	import ProfileLoading from '~/lib/features/ProfileLoading.svelte';
	import EditProfileModal from '~/lib/features/EditProfileModal.svelte';
	import { useProfile } from '~/lib/hooks/useProfile.svelte';
	import { useProfileVideos } from '~/lib/hooks/useProfileVideos.svelte';

	const profile = useProfile();
	const videos = useProfileVideos(() => profile.profileData, () => profile.nickname);

	let showEditProfile = $state(false);
	let activeTab = $state<'videos' | 'liked'>('videos');
</script>

{#if profile.status !== 'success' || !profile.profileData}
	<ProfileLoading status={profile.status} error={profile.error} nickname={profile.nickname} />
{:else}
	<div class="pt-[90px] px-10">
		<ProfileHeader 
			profileData={profile.profileData} 
			isOwnProfile={profile.isOwnProfile} 
			onEditProfile={() => (showEditProfile = true)} 
		/>

		<ProfileStats profileData={profile.profileData} />

		{#if videos.userVideos.length > 0 && videos.userVideos[0].description}
			<p class="pt-4 text-gray-600 text-base max-w-[600px] leading-relaxed text-left italic">
				"{videos.userVideos[0].description}"
			</p>
		{/if}

		<ProfileTabs {activeTab} onTabChange={(tab) => (activeTab = tab)} />

		<ProfileContent {activeTab} userVideos={videos.userVideos} isOwnProfile={profile.isOwnProfile} />
	</div>
{/if}

{#if showEditProfile}
	<EditProfileModal onClose={() => (showEditProfile = false)} />
{/if}
