// @ts-nocheck
"use client";

export type SettingsLocationsTabProps = {
  ctx: Record<string, any>;
};

export default function SettingsLocationsTab({ ctx }: SettingsLocationsTabProps) {
  const {
    accountForm,
    accountInitial,
    activeEmailInboxes,
    activeLeadCount,
    activeLocations,
    activeTab,
    activeTutorCount,
    addCatalogMedia,
    addEmailInbox,
    addRoom,
    addService,
    addSubject,
    addTopic,
    aiRewriteLoading,
    aiRewrites,
    ALL_TABS,
    anyDirty,
    anyDirtyRef,
    AppHeader,
    ARCHIVE_LABELS,
    ARCHIVE_OPTIONS,
    archiveEdits,
    archiveEditsForType,
    archiveEmailInbox,
    archiveHasChanges,
    ArchiveIcon,
    archiveLocation,
    archiveMaps,
    archiveRoom,
    archiveRows,
    archiveSort,
    archiveTutor,
    archiveType,
    ArrowDown01Icon,
    ArrowUp01Icon,
    billableLocations,
    BookOpen01Icon,
    bufferDraft,
    Building04Icon,
    buildProductDraft,
    buildSubjectDrafts,
    businessForm,
    businessInitial,
    Calendar01Icon,
    canAddLocation,
    canAddTutor,
    Cancel01Icon,
    cancelEditLocation,
    cancelEditRoom,
    catalogMediaByKey,
    catalogMediaKey,
    catalogMediaLoading,
    centsToDollars,
    CheckmarkCircle01Icon,
    checkoutHref,
    checkoutHrefFor,
    childPrompt,
    childPromptResolverRef,
    ClampedCell,
    clearAiRewrite,
    clearSocialBuilder,
    CLIENT_FIELDS_STORAGE_KEY,
    clientsForm,
    closeChildUnarchivePrompt,
    closePasswordPrompt,
    companyDirty,
    companyDraft,
    confirmWithPassword,
    connectGoogleInbox,
    CONNECTION_PROVIDERS,
    connectionCardGradient,
    connections,
    connectionsDirty,
    connectionSnapshots,
    connectionStatusById,
    connectionStatusLabel,
    CONTENT_STUDIO_TABS,
    Copy01Icon,
    CreditCardIcon,
    DATE_FORMAT_OPTIONS,
    dateFormat,
    DEFAULT_DATE_FORMAT,
    DEFAULT_SERVICE_NAMES,
    DEFAULT_SUBJECTS,
    DEFAULT_TUTOR_COLOR,
    defaultClientFieldPrefs,
    defaultPipelineSources,
    dirtyTabs,
    discardActive,
    discardSocialCopy,
    dollarsToCents,
    dynamic,
    editLocationDraft,
    editLocationId,
    editRoomDraft,
    editRoomId,
    emailInboxes,
    EMPTY_PRODUCT_DRAFT,
    EMPTY_SOCIAL_DRAFT,
    formatCurrencyFromCents,
    formatDateWithPattern,
    formatPlanLimit,
    Fragment,
    generateSocialCopy,
    generateSocialImage,
    getConnectionProvider,
    getNewRoomDraft,
    getSupabaseBrowserClient,
    handleMediaFileUpload,
    handleSocialTemplateUpload,
    HugeiconsIcon,
    Input,
    isTutorOnly,
    Label,
    LazySettingsTabPanels,
    leadDisplayName,
    leadLimit,
    leads,
    Link01Icon,
    loadCatalogMedia,
    loading,
    loadPipelineSources,
    Location01Icon,
    locationNameById,
    locations,
    locLimit,
    makeEmailSource,
    makeUniqueServiceCode,
    MARKETING_SECTIONS,
    MarketingIcon,
    marketingSection,
    marketingServiceByCode,
    marketingServices,
    marketingSubjectId,
    marketingTab,
    me,
    mediaUrlDrafts,
    mergeEmailInboxSources,
    newEmailInbox,
    newRoomDrafts,
    newService,
    newSubjectName,
    newTopicDrafts,
    newTutor,
    normalizeClientFieldPrefs,
    normalizeDateFormat,
    normalizeKey,
    normalizePlanKey,
    onSave,
    openBillingPortal,
    openChildUnarchivePrompt,
    openPasswordPrompt,
    org,
    otherPlans,
    PackageIcon,
    PARENT_FIELDS,
    parentDisplayName,
    parentNameById,
    parents,
    parseNonNegativeInt,
    passwordDraft,
    passwordPrompt,
    passwordPromptResolverRef,
    patchEmailInbox,
    pipelineForm,
    PipelineIcon,
    plan,
    PLAN_ORDER,
    planCardColor,
    planKey,
    planLabel,
    planLeadLimit,
    planLocationLimit,
    planSpecs,
    planSpecsFor,
    planTutorLimit,
    productAutoSelectedRef,
    productDirty,
    productDraft,
    productDraftInitial,
    productMedia,
    productMediaKey,
    productMediaLoading,
    products,
    productTopicOptions,
    providerLabel,
    queryHandledRef,
    readFileAsDataUrl,
    removeCatalogMedia,
    removePipelineSource,
    removeSocialTemplate,
    renderSortIcons,
    rewriteWithAi,
    roomsByLocation,
    router,
    saveAccount,
    saveAllConnections,
    saveBusiness,
    saveClientFieldPrefs,
    saveClientFields,
    saveCompanyContent,
    saveConnection,
    saveEditLocation,
    saveEditRoom,
    savePipelineSettings,
    savePipelineSources,
    saveProducts,
    saveSchedule,
    saveServiceDescription,
    saveServices,
    saveSocialPost,
    saveSubjectDescription,
    saveSubjectsTopics,
    saveTopicDescription,
    saveTutors,
    scheduleForm,
    scheduleInitial,
    searchParams,
    selectedCarouselPresetId,
    selectedProductService,
    selectedServiceLocationId,
    selectProduct,
    sendResetEmail,
    serviceById,
    serviceCatalogDrafts,
    serviceDescriptionDrafts,
    serviceEdits,
    ServiceIcon,
    serviceLocationId,
    serviceLogoDrafts,
    serviceRows,
    servicesByLocation,
    serviceSort,
    setActiveTab,
    setAiLoading,
    setAiRewrite,
    setAiRewriteLoading,
    setAiRewrites,
    setArchiveEdits,
    setArchiveSort,
    setArchiveType,
    setBufferDraft,
    setCatalogMediaByKey,
    setCatalogMediaLoading,
    setChildPrompt,
    setCompanyDraft,
    setConnections,
    setConnectionSnapshots,
    setEditLocationDraft,
    setEditLocationId,
    setEditRoomDraft,
    setEditRoomId,
    setEmailInboxes,
    setLeads,
    setLoading,
    setLocations,
    setMarketingSection,
    setMarketingSubjectId,
    setMarketingTab,
    setMe,
    setMediaUrlDrafts,
    setNewEmailInbox,
    setNewRoomDrafts,
    setNewService,
    setNewSubjectName,
    setNewTopicDrafts,
    setNewTutor,
    setOrg,
    setParents,
    setPasswordDraft,
    setPasswordPrompt,
    setProductDraft,
    setProductDraftInitial,
    setProducts,
    setRoomsByLocation,
    setServiceCatalogDrafts,
    setServiceDescriptionDrafts,
    setServiceEdits,
    setServiceLocationId,
    setServiceLogoDrafts,
    setServicesByLocation,
    setServiceSort,
    setSocialDraft,
    setSocialSourceType,
    setSocialSourceTypeSelection,
    setSocialTemplates,
    setStatus,
    setStudents,
    setSubjectDescriptionDrafts,
    setSubjectDrafts,
    setSubjectDraftsInitialKey,
    setSubjects,
    setSubjectSort,
    SETTINGS_TAB_ICON_COLORS,
    SettingsPage,
    setToken,
    setTopicDescriptionDrafts,
    setTopicsBySubject,
    setTutorDrafts,
    setTutors,
    setUserEmail,
    SOCIAL_ASPECT_RATIO_FILE_KEYS,
    SOCIAL_ASPECT_RATIOS,
    SOCIAL_DRAFT_STORAGE_KEY,
    SOCIAL_LAYOUT_PRESET_FILE_KEYS,
    SOCIAL_LAYOUT_PRESETS,
    SOCIAL_PLATFORM_SPECS,
    SOCIAL_PRESET_CAROUSEL_ITEMS,
    SOCIAL_TEMPLATE_STYLES,
    socialAspect,
    socialDraft,
    socialMediaOptions,
    socialPresetCarouselRef,
    socialPresetRefs,
    socialPreviewMedia,
    socialSelectedProduct,
    socialSelectedService,
    socialSelectedSubject,
    socialSelectedTemplate,
    socialSelectedTopic,
    socialSourceType,
    socialTemplates,
    socialTopicOptions,
    sortedArchiveRows,
    sortedServiceRows,
    sortedSubjectDrafts,
    startConnectionOAuth,
    startEditLocation,
    startEditRoom,
    status,
    STUDENT_FIELDS,
    studentDisplayName,
    students,
    studentsByParentId,
    subjectBaselineMap,
    subjectDescriptionDrafts,
    subjectDrafts,
    subjectDraftsInitialKey,
    subjectDraftsInitialRef,
    subjectDraftsKey,
    subjectNameById,
    subjects,
    subjectSort,
    supabase,
    switchTab,
    TAB_DIVIDERS,
    TAB_HEADINGS,
    tabs,
    Textarea,
    timezones,
    toggleArchiveSort,
    toggleServiceSort,
    toggleSocialMedia,
    toggleSocialPlatform,
    toggleSubjectSort,
    token,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    topicDescriptionDrafts,
    topicsBySubject,
    tutorDrafts,
    tutorDraftsInitialRef,
    tutorLimit,
    tutors,
    UNIT_LENGTH_TOOLTIP,
    updateArchive,
    updateArchiveDraft,
    updateClientField,
    updateConnectionField,
    updateNewRoomDraft,
    updatePipelineSource,
    updateServiceDraft,
    US_STATES,
    usageColorClass,
    useEffect,
    useMemo,
    useRef,
    userEmail,
    UserGroupIcon,
    useRouter,
    useSearchParams,
    useSettingsForm,
    useState,
    WebDesign01Icon
  } = ctx;

  return (
    <>
              {!loading && activeTab === "LOCATIONS" ? (
                <div className="grid gap-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid gap-2">
                      <div className="text-sm font-semibold">
                        Active Location Capacity
                      </div>
                      <div className="text-xs text-gray-600">
                        Plan limit:{" "}
                        {locLimit === null ? "Unlimited" : `${locLimit}`} ·{" "}
                        <span
                          className={usageColorClass(
                            billableLocations.length,
                            locLimit,
                          )}
                        >
                          Current: {billableLocations.length}
                        </span>
                      </div>
                      {!canAddLocation ? (
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-success w-fit"
                          onClick={() => switchTab("ACCOUNT")}
                        >
                          Change Plan
                        </button>
                      ) : null}
                    </div>
                    {canAddLocation ? (
                      <a
                        href="/setup"
                        className="itutoros-settings-btn itutoros-settings-btn-primary inline-flex items-center justify-center no-underline"
                      >
                        Add location (opens Setup)
                      </a>
                    ) : null}
                  </div>

                  <div className="grid gap-4">
                    {billableLocations.length === 0 ? (
                      <p className="text-sm text-gray-600">No locations yet.</p>
                    ) : null}
                    {activeLocations
                      .filter((loc) => !loc.is_system)
                      .map((loc) => {
                        const rooms = roomsByLocation[loc.id] ?? [];
                        const isEditing =
                          editLocationId === loc.id && editLocationDraft;
                        const locationIsVirtual = isEditing
                          ? editLocationDraft.is_virtual
                          : loc.is_virtual;
                        return (
                          <div
                            key={loc.id}
                            className="rounded-xl border border-gray-200 p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-sm font-semibold">
                                  {loc.location_name}{" "}
                                  {loc.archived_at ? (
                                    <span className="text-xs text-gray-500">
                                      (archived)
                                    </span>
                                  ) : null}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {loc.is_virtual ? "Virtual" : "In-person"}
                                </div>
                              </div>
                              {!loc.archived_at ? (
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                    onClick={() => startEditLocation(loc)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-primary"
                                    onClick={() => archiveLocation(loc.id)}
                                  >
                                    Archive
                                  </button>
                                </div>
                              ) : null}
                            </div>

                            {isEditing ? (
                              <div className="mt-4 grid gap-3">
                                <div className="grid gap-2">
                                  <Label>Location name</Label>
                                  <Input
                                    value={editLocationDraft.location_name}
                                    onChange={(e) =>
                                      setEditLocationDraft((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              location_name: e.target.value,
                                            }
                                          : prev,
                                      )
                                    }
                                  />
                                </div>
                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={editLocationDraft.is_virtual}
                                    onChange={(e) =>
                                      setEditLocationDraft((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              is_virtual: e.target.checked,
                                            }
                                          : prev,
                                      )
                                    }
                                  />
                                  This is a virtual / online location
                                </label>
                                {editLocationDraft.is_virtual ? (
                                  <div className="grid gap-2">
                                    <Label>
                                      Virtual location link (Zoom/Meet/etc.)
                                    </Label>
                                    <Input
                                      value={
                                        editLocationDraft.location_address_1
                                      }
                                      onChange={(e) =>
                                        setEditLocationDraft((prev) =>
                                          prev
                                            ? {
                                                ...prev,
                                                location_address_1:
                                                  e.target.value,
                                              }
                                            : prev,
                                        )
                                      }
                                      placeholder="https://zoom.us/j/..."
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <div className="grid gap-2">
                                      <Label>Address line 1</Label>
                                      <Input
                                        value={
                                          editLocationDraft.location_address_1
                                        }
                                        onChange={(e) =>
                                          setEditLocationDraft((prev) =>
                                            prev
                                              ? {
                                                  ...prev,
                                                  location_address_1:
                                                    e.target.value,
                                                }
                                              : prev,
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label>Address line 2</Label>
                                      <Input
                                        value={
                                          editLocationDraft.location_address_2
                                        }
                                        onChange={(e) =>
                                          setEditLocationDraft((prev) =>
                                            prev
                                              ? {
                                                  ...prev,
                                                  location_address_2:
                                                    e.target.value,
                                                }
                                              : prev,
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                      <div className="grid gap-2 sm:col-span-2">
                                        <Label>City</Label>
                                        <Input
                                          value={
                                            editLocationDraft.location_city
                                          }
                                          onChange={(e) =>
                                            setEditLocationDraft((prev) =>
                                              prev
                                                ? {
                                                    ...prev,
                                                    location_city:
                                                      e.target.value,
                                                  }
                                                : prev,
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label>State</Label>
                                        <select
                                          className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                          value={
                                            editLocationDraft.location_state
                                          }
                                          onChange={(e) =>
                                            setEditLocationDraft((prev) =>
                                              prev
                                                ? {
                                                    ...prev,
                                                    location_state:
                                                      e.target.value,
                                                  }
                                                : prev,
                                            )
                                          }
                                        >
                                          <option value="">—</option>
                                          {US_STATES.map((s) => (
                                            <option key={s} value={s}>
                                              {s}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label>ZIP</Label>
                                      <Input
                                        value={editLocationDraft.location_zip}
                                        onChange={(e) =>
                                          setEditLocationDraft((prev) =>
                                            prev
                                              ? {
                                                  ...prev,
                                                  location_zip: e.target.value,
                                                }
                                              : prev,
                                          )
                                        }
                                      />
                                    </div>
                                  </>
                                )}
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-primary"
                                    onClick={() => saveEditLocation()}
                                  >
                                    Save location
                                  </button>
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                    onClick={() => cancelEditLocation()}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : null}

                            <div className="mt-4">
                              <div className="text-xs font-semibold text-gray-600">
                                Rooms
                              </div>
                              {locationIsVirtual ? (
                                <div className="mt-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
                                  Virtual locations don't use rooms. Any
                                  existing rooms will be archived.
                                </div>
                              ) : (
                                <>
                                  {rooms.length === 0 ? (
                                    <div className="text-sm text-gray-600">
                                      No rooms.
                                    </div>
                                  ) : null}
                                  <ul className="mt-2 grid gap-2">
                                    {rooms
                                      .slice()
                                      .sort(
                                        (a, b) =>
                                          Number(Boolean(a.archived_at)) -
                                          Number(Boolean(b.archived_at)),
                                      )
                                      .map((room) => {
                                        const roomEditing =
                                          editRoomId === room.id &&
                                          editRoomDraft;
                                        return (
                                          <li
                                            key={room.id}
                                            className="rounded-lg border border-gray-100 p-2"
                                          >
                                            {roomEditing ? (
                                              <div className="grid gap-2 sm:grid-cols-4 sm:items-end">
                                                <div className="grid gap-1 sm:col-span-2">
                                                  <Label>Room name</Label>
                                                  <Input
                                                    value={
                                                      editRoomDraft.room_name
                                                    }
                                                    onChange={(e) =>
                                                      setEditRoomDraft(
                                                        (prev) =>
                                                          prev
                                                            ? {
                                                                ...prev,
                                                                room_name:
                                                                  e.target
                                                                    .value,
                                                              }
                                                            : prev,
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="grid gap-1">
                                                  <Label>Room #</Label>
                                                  <Input
                                                    value={
                                                      editRoomDraft.room_number
                                                    }
                                                    onChange={(e) =>
                                                      setEditRoomDraft(
                                                        (prev) =>
                                                          prev
                                                            ? {
                                                                ...prev,
                                                                room_number:
                                                                  e.target
                                                                    .value,
                                                              }
                                                            : prev,
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="grid gap-1">
                                                  <Label>Floor</Label>
                                                  <Input
                                                    value={
                                                      editRoomDraft.floor_number
                                                    }
                                                    onChange={(e) =>
                                                      setEditRoomDraft(
                                                        (prev) =>
                                                          prev
                                                            ? {
                                                                ...prev,
                                                                floor_number:
                                                                  e.target
                                                                    .value,
                                                              }
                                                            : prev,
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="flex gap-2 sm:col-span-4">
                                                  <button
                                                    type="button"
                                                    className="itutoros-settings-btn itutoros-settings-btn-primary"
                                                    onClick={() =>
                                                      saveEditRoom()
                                                    }
                                                  >
                                                    Save room
                                                  </button>
                                                  <button
                                                    type="button"
                                                    className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                                    onClick={() =>
                                                      cancelEditRoom()
                                                    }
                                                  >
                                                    Cancel
                                                  </button>
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="flex items-center justify-between gap-3">
                                                <div className="text-sm">
                                                  {room.room_name}{" "}
                                                  {room.archived_at ? (
                                                    <span className="text-xs text-gray-500">
                                                      (archived)
                                                    </span>
                                                  ) : null}
                                                </div>
                                                {!room.archived_at ? (
                                                  <div className="flex items-center gap-2">
                                                    <button
                                                      type="button"
                                                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                                      onClick={() =>
                                                        startEditRoom(room)
                                                      }
                                                    >
                                                      Edit
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="itutoros-settings-btn itutoros-settings-btn-primary"
                                                      onClick={() =>
                                                        archiveRoom(room)
                                                      }
                                                    >
                                                      Archive
                                                    </button>
                                                  </div>
                                                ) : null}
                                              </div>
                                            )}
                                          </li>
                                        );
                                      })}
                                  </ul>
                                  {!loc.archived_at ? (
                                    <div className="mt-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
                                      <div className="text-xs font-semibold text-gray-600">
                                        Add room
                                      </div>
                                      <div className="mt-2 grid gap-2 sm:grid-cols-4 sm:items-end">
                                        <div className="grid gap-1 sm:col-span-2">
                                          <Label>Room name</Label>
                                          <Input
                                            value={
                                              getNewRoomDraft(loc.id).room_name
                                            }
                                            onChange={(e) =>
                                              updateNewRoomDraft(loc.id, {
                                                room_name: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="grid gap-1">
                                          <Label>Room #</Label>
                                          <Input
                                            value={
                                              getNewRoomDraft(loc.id)
                                                .room_number
                                            }
                                            onChange={(e) =>
                                              updateNewRoomDraft(loc.id, {
                                                room_number: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="grid gap-1">
                                          <Label>Floor</Label>
                                          <Input
                                            value={
                                              getNewRoomDraft(loc.id)
                                                .floor_number
                                            }
                                            onChange={(e) =>
                                              updateNewRoomDraft(loc.id, {
                                                floor_number: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="flex gap-2 sm:col-span-4">
                                          <button
                                            type="button"
                                            className="itutoros-settings-btn itutoros-settings-btn-primary"
                                            onClick={() => addRoom(loc.id)}
                                          >
                                            Add room
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : null}
    </>
  );
}
